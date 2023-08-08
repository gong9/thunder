import type { Raycaster } from 'three'
import { Mesh } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'

class TwinsThreeMesh extends Mesh {
  private natureEventMap: Map<CubeEventType, EventHandleFn<CubeEventType>[]> = new Map()

  constructor(geometry?: ConstructorParameters<typeof Mesh>[0], material?: ConstructorParameters<typeof Mesh>[1]) {
    super(geometry, material)
  }

  /**
   * addNatureEventListener
   * @param type
   * @param handlefn
   */
  public addNatureEventListener<T extends CubeEventType>(type: T, handlefn: EventHandleFn<T>) {
    if (!this.natureEventMap.has(type))
      this.natureEventMap.set(type, [])

    this.natureEventMap.get(type)!.push(handlefn)
  }

  /**
   * removeNatureEventListener
   * @param type
   * @param handlefn
   */
  public removeNatureEventListener<T extends CubeEventType>(type: T, handlefn: EventHandleFn<T>) {
    if (!this.natureEventMap.has(type))
      return

    const handlefns = this.natureEventMap.get(type)!
    const index = handlefns.findIndex(fn => fn === handlefn)
    if (index > -1)
      handlefns.splice(index, 1)
  }

  /**
   * removeAllNatureEventListener
   */
  public removeAllNatureEventListener() {
    this.natureEventMap.clear()
  }

  /**
   * handle mesh raycaster
   * @param raycaster
   * @param intersects
   */
  public raycast(raycaster: Raycaster, intersects: any[]) {
    super.raycast(raycaster, intersects)

    // is this object intersected with raycaster
    if (intersects.length > 0) {
      const intersect = intersects[0]
      const object = intersect.object as TwinsThreeMesh

      if (object === this) {
        // get nature event
        const natureEvent = this.natureEventMap.get('click')

        if (natureEvent) {
          natureEvent.forEach((handlefn) => {
            handlefn(object)
          })
        }
      }
    }
  }
}

export default TwinsThreeMesh