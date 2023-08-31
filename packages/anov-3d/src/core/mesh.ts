import type { Intersection, Raycaster } from 'three'
import { Mesh as TMesh } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'
import globalObjectManage from './global/global'

class Mesh extends TMesh {
  private natureEventMap: Map<CubeEventType, EventHandleFn<CubeEventType>[]> = new Map()
  private entered = false

  constructor(geometry?: ConstructorParameters<typeof TMesh>[0], material?: ConstructorParameters<typeof TMesh>[1]) {
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
   * handle intersect event
   * @param intersects
   * @param eventType
   */
  private handleClick(natureEvent: EventHandleFn<CubeEventType>[], intersect: Intersection) {
    if (!globalObjectManage.triggerClick)
      return

    // get nature event
    natureEvent.forEach((handlefn) => {
      handlefn(this, intersect)
    })
  }

  /**
   * handle pointermove event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerMove(natureEvent: EventHandleFn<CubeEventType>[], intersect: Intersection) {
    natureEvent.forEach((handlefn) => {
      handlefn(this, intersect)
    })
  }

  /**
   * handle pointerleave event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerleave() {
    const pointerleaveCallback = this.natureEventMap.get('pointerleave')
    pointerleaveCallback && pointerleaveCallback.length > 0 && pointerleaveCallback.forEach((handlefn) => {
      handlefn(this)
    },
    )
  }

  /**
   * handle mesh raycaster
   * @param raycaster
   * @param intersects
   */
  public raycast(raycaster: Raycaster, intersects: Intersection[]) {
    if (this.natureEventMap.size === 0)
      return

    super.raycast(raycaster, intersects)

    const clickCallback = this.natureEventMap.get('click')
    const pointerupCallback = this.natureEventMap.get('pointerup')
    const pointerdownCallback = this.natureEventMap.get('pointerdown')
    const pointermoveCallback = this.natureEventMap.get('pointermove')

    const intersect = intersects[0]
    const object = intersect && intersect.object as Mesh

    if (object === this) {
      this.entered = true

      clickCallback && clickCallback.length > 0 && this.handleClick(clickCallback, intersect)
      pointerupCallback && pointerupCallback.length > 0 && this.handleClick(pointerupCallback, intersect)
      pointerdownCallback && pointerdownCallback.length > 0 && this.handleClick(pointerdownCallback, intersect)
      pointermoveCallback && pointermoveCallback.length > 0 && this.handlePointerMove(pointermoveCallback, intersect)
    }
    else {
      if (this.entered) {
        this.handlePointerleave()
        this.entered = false
      }
    }
  }
}

export default Mesh