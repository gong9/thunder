import type { Color, Object3D } from 'three'
import { ACESFilmicToneMapping, AmbientLight, Raycaster, Scene as TScene, Vector2, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as TWEEN from '@tweenjs/tween.js'
import Cssrenderer from './cssRenderer'
import globalControl from './globalControl'
import globalObjectManage from './global'
import { PerspectiveCamera } from './camera'

interface Anov3DSceneOptions {
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
   * controls
   */
  orbitControls?: boolean

  /**
   * 是否需要默认环境光
   */
  ambientLight?: boolean

  /**
   * on demand render scene, 按需渲染
   */
  onDemand?: boolean

  /**
   * 是否开启css2d渲染
   */
  css2DRenderer?: boolean

  /**
   * 是否开启css3d渲染
   */
  css3DRenderer?: boolean

}

class Scene {
  private opts: Anov3DSceneOptions = {}
  private pointer: Vector2 = new Vector2()
  scene: TScene | null = null
  raycaster: Raycaster | null = null
  ambientLight: AmbientLight | null = null
  camera: PerspectiveCamera | null = null
  renderer: WebGLRenderer | null = null
  cssRenderer: Cssrenderer | null = null
  controls: OrbitControls | null = null

  constructor(opts?: Anov3DSceneOptions) {
    this.opts = opts ?? {}
    this.scene = new TScene()
    this.raycaster = new Raycaster()
    globalObjectManage.addScene(this.scene)
    this.defaultInit()
  }

  /**
   * init default scene components
   */
  private defaultInit() {
    const camera = this.initDefaultPerspectiveCamera()
    this.camera = camera
    this.scene!.add(camera)

    const renderer = this.initRenderer()
    this.renderer = renderer

    if (this.opts.css2DRenderer) {
      const cssRenderer = this.initCssRenderer()
      this.cssRenderer = cssRenderer
    }

    if (this.opts.ambientLight) {
      const ambientLight = this.initAmbientLight()
      this.ambientLight = ambientLight
      this.scene!.add(ambientLight)
    }
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

    return renderer
  }

  private initCssRenderer() {
    const cssRenderer = new Cssrenderer('base')
    cssRenderer.setSize(window.innerWidth, window.innerHeight)
    return cssRenderer
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

    const position = rendererOps.position || new Vector3(0, 10, 10)
    camera.position.set(position.x, position.y, position.z)

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

    if (frameAnimate)
      frameAnimate(this.renderer)

    globalControl.update()
    TWEEN.update()
    this.renderer!.render(this.scene!, this.camera!)
    this.cssRenderer && this.cssRenderer.render(this.scene!, this.camera!)

    this.controls && this.controls.update()
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
    globalObjectManage.setTriggerClickState(false)
    this.getPointerPosition(event)
    this.updateRaycaster()
  }

  /**
   * handle pointerdown event
   * @param event
   */
  private onPointerDown(event: PointerEvent) {
    globalObjectManage.setTriggerClickState(true)
    this.getPointerPosition(event)
    this.updateRaycaster()
  }

  /**
   * handle pointermove event
   * @param event
   */
  private onPointerMove(event: PointerEvent) {
    this.getPointerPosition(event)
    this.updateRaycaster()
  }

  /**
   * handle pointerleave event
   * @param event
   */
  private onPointerLeave(event: PointerEvent) {
    this.getPointerPosition(event)
    this.updateRaycaster()
  }

  /**
   * handle event register
   * @param target
   */
  private registerEvent(target: HTMLElement) {
    target.addEventListener('pointerup', (e: PointerEvent) => this.onPointerPointerup(e))
    target.addEventListener('pointerdown', (e: PointerEvent) => this.onPointerDown(e))
    target.addEventListener('pointermove', (e: PointerEvent) => this.onPointerMove(e))
    target.addEventListener('pointerleave', (e: PointerEvent) => this.onPointerLeave(e))
  }

  render(target: HTMLElement) {
    let currentControlDom: HTMLElement | null = null

    if (this.cssRenderer) {
      currentControlDom = this.cssRenderer.cssRenderer.domElement
      target.appendChild(currentControlDom)
      currentControlDom.style.position = 'absolute'
      currentControlDom.style.top = '0'
    }

    if (this.opts.orbitControls)
      this.controls = new OrbitControls(this.camera!, currentControlDom || this.renderer!.domElement)

    target.appendChild(this.renderer!.domElement)

    this.registerEvent(currentControlDom || this.renderer!.domElement)

    target.addEventListener('resize', () => this.resetScene(this.camera!, this.renderer!))
  }

  public destroy() {
    window.removeEventListener('resize', () => this.resetScene(this.camera!, this.renderer!))
  }
}

export default Scene
