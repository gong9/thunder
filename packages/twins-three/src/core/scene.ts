import { ACESFilmicToneMapping, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'

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
}

class TwinsThreeScene {
  private opts: TwinsThreeSceneOptions = {}
  scene: Scene | null = null
  camera: PerspectiveCamera | null = null
  renderer: WebGLRenderer | null = null

  constructor(opts: TwinsThreeSceneOptions) {
    this.opts = opts
    this.scene = new Scene()
  }

  /**
   * init scene
   * @param camera
   * @param renderer
   */
  private resetScene(camera: PerspectiveCamera, renderer: WebGLRenderer) {
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
  }

  private frameAnimate() {}

  render() {
    this.initDefaultPerspectiveCamera()
    this.initRenderer()
  }
}

export default TwinsThreeScene
