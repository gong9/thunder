import type { Scene } from 'three'

class GlobalObjectManage {
  public scene: Scene | null = null
  public triggerClick = false
  constructor() {

  }

  public addScene(object3d: Scene) {
    this.scene = object3d
  }

  public setTriggerClickState(state: boolean) {
    this.triggerClick = state
  }
}

export default new GlobalObjectManage()