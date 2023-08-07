import type { Raycaster } from 'three'
import { Mesh } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'

class TwinsThreeMesh extends Mesh {
  private natureEventMap: Map<CubeEventType, EventHandleFn<CubeEventType>[]> = new Map()
  constructor(geometry?: ConstructorParameters<typeof Mesh>[0], material?: ConstructorParameters<typeof Mesh>[1]) {
    super(geometry, material)
  }

  public addNatureEventListener<T extends CubeEventType>(type: T, handlefn: EventHandleFn<T>) {

  }

  public removeNatureEventListener<T extends CubeEventType>(type: T, handlefn: EventHandleFn<T>) {}

  public removeAllNatureEventListener() {}

  public raycast(raycaster: Raycaster, intersects: any[]) {
    console.log(intersects)
  }
}

export default TwinsThreeMesh