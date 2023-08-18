import type { Scene } from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TransformControls } from './control/transformControls'
import type { PerspectiveCamera } from './camera'

class GlobalObjectManage {
  public scene: Scene | null = null
  public triggerClick = false
  public camera: PerspectiveCamera | null = null
  public domElement: HTMLElement | null = null
  public orbitControls: OrbitControls | null = null
  public transformControls: TransformControls[] = []
  constructor() {

  }

  public addScene(object3d: Scene) {
    this.scene = object3d
  }

  public setCamera(camera: PerspectiveCamera) {
    this.camera = camera
  }

  public setDomElement(domElement: HTMLElement) {
    this.domElement = domElement
  }

  public setOrbitControls(orbitControls: OrbitControls) {
    this.orbitControls = orbitControls
  }

  public setTransformControls(transformControls: TransformControls) {
    this.transformControls.push(transformControls)
  }

  public setTriggerClickState(state: boolean) {
    this.triggerClick = state
  }
}

export default new GlobalObjectManage()