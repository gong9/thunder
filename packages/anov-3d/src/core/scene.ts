import type { Color, Object3D } from 'three'
import { ACESFilmicToneMapping, AmbientLight, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { emitter } from '../utils'

interface TwinsThreeSceneOptions {
  /**
   * renderer options
   */
  rendererOps?: {
    antialias?: boolean
    logarithmicDepthBuffer?: boolean
  }

  /**
   * default camera options
   */
  defCameraOps?: {
    position?: Vector3
    fov?: number
    aspect?: number
    near?: number
    far?: number
  }

  /**
   * default ambient light options
   */
  defAmbientLightOps?: {
    position?: Vector3
    color?: Color
    intensity?: number
  }

  /**
   * Controls
   */
  orbitControls?: boolean

  /**
   * if need ambient light
   */
  ambientLight?: boolean

  /**
   * on demand render scene, 按需渲染
   */
  onDemand?: boolean

}

class TwinsThreeScene {
  private opts: TwinsThreeSceneOptions = {}
  private pointer: Vector2 = new Vector2()
  scene: Scene | null = null
  raycaster: Raycaster | null = null
  camera: PerspectiveCamera | null = null
  renderer: WebGLRenderer | null = null
  controls: OrbitControls | null = null

  constructor(opts: TwinsThreeSceneOptions) {
    this.opts = opts ?? {}
    this.scene = new Scene()
    this.raycaster = new Raycaster()
  }

  /**
   * init scene
   * @param camera
   * @param renderer
   */
  public resetScene(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  }

  /**
   * init renderer
   */
  private initRenderer() {
    const rendererOps = this.opts.rendererOps || {}

    const renderer = new WebGLRenderer({
      antialias: rendererOps.antialias ?? true,
      logarithmicDepthBuffer: rendererOps.logarithmicDepthBuffer ?? true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.3
    renderer.setPixelRatio(window.devicePixelRatio)

    this.renderer = renderer
    return renderer
  }

  /**
   * init default camera
   */
  private initDefaultPerspectiveCamera() {
    const rendererOps = this.opts.defCameraOps || {}
    const camera = new PerspectiveCamera(
      rendererOps.fov || 90,
      window.innerWidth / window.innerHeight,
      rendererOps.near || 0.1,
      rendererOps.far || 1000,
    )

    const position = rendererOps.position || new Vector3(0, 3, 10)
    camera.position.set(position.x, position.y, position.z)

    this.camera = camera
    this.scene!.add(camera)
    return camera
  }

  /**
   * init ambient light
   * @param position
   * @param color
   * @param intensity
   * @returns
   */
  private initAmbientLight() {
    const defConfigOps = this.opts.defAmbientLightOps || {}
    const position = defConfigOps.position || new Vector3(0, 3, 10)
    const ambientLight = new AmbientLight(defConfigOps.color || 0xFFFFFF, defConfigOps.intensity || 1)
    ambientLight.position.set(position.x, position.y, position.z)

    return ambientLight
  }

  /**
   * frame render
   */
  public startFrameAnimate(frameAnimate?: (renderer: WebGLRenderer) => void) {
    if (!this.renderer || !this.scene || !this.camera)
      throw new Error('scene or camera or renderer is not init')

    if (frameAnimate) {
      frameAnimate(this.renderer)
    }
    else {
      this.controls && this.controls.update()
      this.renderer!.render(this.scene!, this.camera!)
    }

    requestAnimationFrame(() => this.startFrameAnimate(frameAnimate))
  }

  /**
   * scene add object3d
   * @param object3d
   */
  public add(object3d: Object3D) {
    this.scene!.add(object3d)
  }

  /**
   * update raycaster
   */
  private updateRaycaster() {
    this.raycaster!.setFromCamera(this.pointer, this.camera!)
    this.raycaster!.intersectObjects(this.scene!.children)
  }

  private getPointerPosition(event: PointerEvent) {
    this.pointer.setX((event.clientX / window.innerWidth) * 2 - 1)
    this.pointer.setY(-(event.clientY / window.innerHeight) * 2 + 1)
  }

  /**
   * handle pointerup event
   * @param event
   */
  private onPointerPointerup(event: PointerEvent) {
    this.getPointerPosition(event)
    emitter.emit('pointerup')
    this.updateRaycaster()
  }

  /**
   * handle pointerdown event
   * @param event
   */
  private onPointerDown(event: PointerEvent) {
    this.getPointerPosition(event)
    emitter.emit('pointerdown')
    this.updateRaycaster()
  }

  /**
   * handle pointermove event
   * @param event
   */
  private onPointerMove(event: PointerEvent) {
    this.getPointerPosition(event)
    emitter.emit('pointermove')
    this.updateRaycaster()
  }

  /**
   * handle pointerleave event
   * @param event
   */
  private onPointerLeave(event: PointerEvent) {
    this.getPointerPosition(event)
    emitter.emit('pointerleave')
    this.updateRaycaster()
  }

  /**
   * handle event register
   * @param target
   */
  private registerEvent(target: HTMLCanvasElement) {
    target.addEventListener('pointerup', (e: PointerEvent) => this.onPointerPointerup(e))
    target.addEventListener('pointerdown', (e: PointerEvent) => this.onPointerDown(e))
    target.addEventListener('pointermove', (e: PointerEvent) => this.onPointerMove(e))
    target.addEventListener('pointerleave', (e: PointerEvent) => this.onPointerLeave(e))
  }

  render(target: HTMLElement) {
    const camera = this.initDefaultPerspectiveCamera()
    const renderer = this.initRenderer()

    if (this.opts.orbitControls)
      this.controls = new OrbitControls(camera, renderer.domElement)

    if (this.opts.ambientLight) {
      const ambientLight = this.initAmbientLight()
      this.scene!.add(ambientLight)
    }

    target.appendChild(renderer.domElement)
    this.registerEvent(renderer.domElement)

    target.addEventListener('resize', () => this.resetScene(camera, renderer))
  }

  public destroy() {
    window.removeEventListener('resize', () => this.resetScene(this.camera!, this.renderer!))
  }
}

export default TwinsThreeScene
