import type { Scene } from 'three'

class GlobalObjectManage {
  public scene: Scene | null = null
  constructor() {

  }

  public addScene(object3d: Scene) {
    this.scene = object3d
  }
}

export default new GlobalObjectManage()