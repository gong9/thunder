import type { Object3D } from 'three'
import { ACESFilmicToneMapping, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
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
}

class TwinsThreeScene {
  private opts: TwinsThreeSceneOptions = {}
  scene: Scene | null = null
  camera: PerspectiveCamera | null = null
  renderer: WebGLRenderer | null = null
  controls: OrbitControls | null = null

  constructor(opts: TwinsThreeSceneOptions) {
    this.opts = opts ?? {}
    this.scene = new Scene()
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
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )

    const position = rendererOps.position || new Vector3(0, 3, 3)
    camera.position.set(position.x, position.y, position.z)

    this.camera = camera
    this.scene!.add(camera)
    return camera
  }

  /**
   * frame render
   */
  public startFrameAnimate() {
    if (!this.renderer || !this.scene || !this.camera)
      throw new Error('scene or camera or renderer is not init')

    this.controls && this.controls.update()
    this.renderer!.render(this.scene!, this.camera!)
    requestAnimationFrame(() => this.startFrameAnimate())
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
  }
}

export default TwinsThreeScene
