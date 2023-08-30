import type { Color, Object3D, ToneMapping } from 'three'
import { ACESFilmicToneMapping, AmbientLight, CubeTextureLoader, Raycaster, Scene as TScene, Vector2, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as TWEEN from '@tweenjs/tween.js'
import { emitter } from '../utils'
import Mesh from './mesh'
import Cssrenderer from './cssRenderer'
import globalControl from './global/globalControl'
import globalObjectManage from './global/global'
import { PerspectiveCamera } from './camera'

interface SceneOptions {
  /** renderer options */
  rendererOps?: {
    antialias?: boolean
    logarithmicDepthBuffer?: boolean
    alpha?: boolean
    shadowMap?: boolean
    toneMapping?: ToneMapping
    toneMappingExposure?: number
    size?: {
      width: number
      height: number
      updateStyle?: boolean
    }
  }

  /** default camera options */
  defCameraOps?: {
    position?: Vector3
    fov?: number
    aspect?: number
    near?: number
    far?: number
  }

  /** default ambient light options */
  defAmbientLightOps?: {
    position?: Vector3
    color?: Color
    intensity?: number
  }

  /** 默认射线检测配置 */
  defRaycasterOps?: {
    recursive?: boolean
  }

  /** controls */
  orbitControls?: boolean

  /** 是否需要默认环境光 */
  ambientLight?: boolean

  /** on demand render scene, 按需渲染 */
  onDemand?: boolean

  /** 是否开启css2d渲染 */
  css2DRenderer?: boolean

  /** 是否开启css3d渲染 */
  css3DRenderer?: boolean

  /** 是否开启裁剪 */
  cutout?: boolean

  background?: {
    imgs?: Tuple<string>
    color?: Color
    panorama?: string
  }

}

type Tuple<TItem> = [TItem, ...TItem[]] & { length: 6 }
interface CutoutAreaType {
  x: number
  y: number
  width: number
  height: number
}

class Scene {
  private opts: SceneOptions = {}
  private pointer: Vector2 = new Vector2()

  scene: TScene | null = null
  raycaster: Raycaster | null = null
  ambientLight: AmbientLight | null = null
  camera: PerspectiveCamera | null = null
  renderer: WebGLRenderer | null = null
  cssRenderer: Cssrenderer | null = null
  controls: OrbitControls | null = null
  domElement: HTMLElement | null = null

  /** 裁剪相关 */
  cutoutCamera: PerspectiveCamera | null = null
  cutoutArea: CutoutAreaType = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  constructor(opts?: SceneOptions) {
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
    globalObjectManage.setCamera(camera)
    this.scene!.add(camera)

    if (this.opts.css2DRenderer) {
      const cssRenderer = this.initCssRenderer()
      this.cssRenderer = cssRenderer
    }

    if (this.opts.ambientLight) {
      const ambientLight = this.initAmbientLight()
      this.ambientLight = ambientLight
      this.scene!.add(ambientLight)
    }

    if (this.opts.background?.imgs)
      this.initSkyBox(this.opts.background?.imgs)
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
      alpha: rendererOps.alpha ?? false,
    })

    this.cutMain(renderer)

    renderer.shadowMap.enabled = rendererOps.shadowMap ?? true
    renderer.toneMapping = (rendererOps.toneMapping ?? ACESFilmicToneMapping) as ToneMapping
    renderer.toneMappingExposure = rendererOps.toneMappingExposure ?? 0.3
    renderer.setPixelRatio(window.devicePixelRatio)

    return renderer
  }

  /**
   * main view cut
   * @param renderer
   */
  private cutMain(renderer: WebGLRenderer) {
    const rendererOps = this.opts.rendererOps || {}
    const w = rendererOps.size?.width ?? window.innerWidth
    const h = rendererOps.size?.height ?? window.innerHeight

    renderer.setSize(w, h)
    renderer.setScissor(0, 0, w, h)

    renderer.render(this.scene!, this.camera!)
  }

  /**
   * mini view cut
   * @param renderer
   */
  private cutSub(renderer: WebGLRenderer) {
    const rendererOps = this.opts.rendererOps || {}
    const w = rendererOps.size?.width ?? window.innerWidth
    const h = rendererOps.size?.height ?? window.innerHeight

    // todo color 配置，位置定义
    renderer.setClearColor('#222')
    renderer.setScissor(w - this.cutoutArea.width, 0, this.cutoutArea.width, this.cutoutArea.height)
    renderer.setViewport(w - this.cutoutArea.width, 0, this.cutoutArea.width, this.cutoutArea.height)

    renderer.render(this.scene!, this.cutoutCamera!)
  }

  private initCssRenderer() {
    const rendererOps = this.opts.rendererOps || {}
    const w = rendererOps.size?.width ?? window.innerWidth
    const h = rendererOps.size?.height ?? window.innerHeight
    const cssRenderer = new Cssrenderer('base')
    cssRenderer.setSize(w, h)
    return cssRenderer
  }

  /**
   * init skybox
   * @param imgs
   */
  private initSkyBox(imgs: Tuple<string>) {
    const cubeTextureLoader = new CubeTextureLoader()

    cubeTextureLoader.load([
      imgs[0],
      imgs[1],
      imgs[2],
      imgs[3],
      imgs[4],
      imgs[5],
    ], (texture) => {
      this.scene!.background = texture
    })
  }

  /**
   * init default camera
   */
  private initDefaultPerspectiveCamera() {
    const rendererOps = this.opts.defCameraOps || {}
    const aspect = rendererOps.aspect || window.innerWidth / window.innerHeight

    const camera = new PerspectiveCamera(
      rendererOps.fov || 90,
      aspect,
      rendererOps.near || 0.1,
      rendererOps.far || 5000,
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
   * @param frameAnimate
   */
  public startFrameAnimate(frameAnimate?: (renderer: WebGLRenderer) => void) {
    if (!this.renderer || !this.scene || !this.camera)
      throw new Error('scene or camera or renderer is not init')

    if (frameAnimate)
      frameAnimate(this.renderer)

    if (globalObjectManage.frameCallbacks.size > 0)
      globalObjectManage.frameCallbacks.forEach((cb) => { cb() })

    globalControl.update()
    TWEEN.update()

    // if need cutout
    if (this.opts.cutout)
      this.updateRenderForCut()
    else
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
    const raycasterOps = this.opts.defRaycasterOps || {}
    this.raycaster!.setFromCamera(this.pointer, this.camera!)

    // need expand
    const object3ds = this.scene!.children.filter((item: Object3D) => {
      return item instanceof Mesh
    })

    this.raycaster!.intersectObjects(object3ds, raycasterOps.recursive ?? false)

    // group的拾取，构建一个mesh？

    // const intersects = this.raycaster!.intersectObjects(this.scene!.children, false)
    // globalObjectManage.groupCatch.forEach((group) => {
    //   if (intersects.length > 0)
    //     group.raycastGroup(intersects as Intersection<Object3D<Event>>[])
    // })
  }

  private getPointerPosition(event: PointerEvent) {
    const container = this.domElement!

    this.pointer.setX(((event.clientX - container.getBoundingClientRect().left) / container.getBoundingClientRect().width) * 2 - 1)
    this.pointer.setY(-((event.clientY - container.getBoundingClientRect().top) / container.getBoundingClientRect().height) * 2 + 1)
  }

  /**
   * handle pointerup event
   * @param event
   */
  private onPointerPointerup(event: PointerEvent) {
    globalObjectManage.setTriggerClickState(false)

    const transformControls = globalObjectManage.transformControls

    if (transformControls.length > 0) {
      transformControls.forEach((transformControl) => {
        transformControl.detach()
      })
    }

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

  /**
   * render scene
   * @param target
   */
  public render(target: HTMLElement) {
    emitter.emit('before-render')

    const renderer = this.initRenderer()
    this.renderer = renderer

    let currentControlDom: HTMLElement | null = null
    const domElement = this.renderer!.domElement

    this.domElement = domElement

    if (this.cssRenderer) {
      currentControlDom = this.cssRenderer.cssRenderer.domElement
      target.appendChild(currentControlDom)
      currentControlDom.style.position = 'absolute'
      currentControlDom.style.top = '0'
    }

    if (this.opts.orbitControls) {
      this.controls = new OrbitControls(this.camera!, currentControlDom || domElement)
      globalObjectManage.setOrbitControls(this.controls)
    }

    globalObjectManage.setDomElement(currentControlDom || domElement)

    target.appendChild(domElement)

    this.registerEvent(currentControlDom || domElement)
    target.addEventListener('resize', () => this.resetScene(this.camera!, this.renderer!))

    emitter.emit('after-render')
  }

  private updateRenderForCut() {
    this.renderer!.setScissorTest(true)

    this.cutMain(this.renderer!)
    this.cutSub(this.renderer!)
  }

  public destroy() {
    window.removeEventListener('resize', () => this.resetScene(this.camera!, this.renderer!))
  }
}

export default Scene
