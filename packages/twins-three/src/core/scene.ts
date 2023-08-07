import type { Object3D } from 'three'
import { ACESFilmicToneMapping, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
   * Controls
   */

  orbitControls?: boolean

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
   * update raycaster
   */
  private updateRaycaster() {
    this.raycaster!.setFromCamera(this.pointer, this.camera!)
    const intersects = this.raycaster!.intersectObjects(this.scene!.children)
    console.log(this.scene!.children)

    for (let i = 0; i < intersects.length; i++)
      console.log(intersects[i])
  }

  private onPointerClick(event: MouseEvent) {
    this.pointer.setX((event.clientX / window.innerWidth) * 2 - 1)
    this.pointer.setY(-(event.clientY / window.innerHeight) * 2 + 1)

    this.updateRaycaster()
  }

  public add(object3d: Object3D) {
    this.scene!.add(object3d)
  }

  render(target: HTMLElement) {
    const camera = this.initDefaultPerspectiveCamera()
    const renderer = this.initRenderer()

    if (this.opts.orbitControls)
      this.controls = new OrbitControls(camera, renderer.domElement)

    target.appendChild(renderer.domElement)

    target.addEventListener('click', (e: MouseEvent) => this.onPointerClick(e))
    // window.addEventListener('pointermove', (e: MouseEvent) => this.onPointerClick(e))
    target.addEventListener('resize', () => this.resetScene(camera, renderer))
  }

  public destroy() {
    window.removeEventListener('resize', () => this.resetScene(this.camera!, this.renderer!))
  }
}

export default TwinsThreeScene
