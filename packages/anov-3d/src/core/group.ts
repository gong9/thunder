import type { Intersection, Object3D } from 'three'
import { Group as TGroup } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'
import globalObjectManage from './global/global'

class Group extends TGroup {
  private natureEventMap: Map<CubeEventType, EventHandleFn<CubeEventType>[]> = new Map()
  private object3d: Object3D[] = []

  constructor() {
    super()
    globalObjectManage.addCatch(this)
  }

  /**
   * add model
   * @param object
   */
  public addModel(object: Object3D) {
    super.add(object)
    this.object3d.push(object)
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
  private handleClick(natureEvent: EventHandleFn<CubeEventType>[]) {
    if (!globalObjectManage.triggerClick)
      return

    // get nature event
    natureEvent.forEach((handlefn) => {
      // handlefn(this)
    })
  }

  /**
   * handle pointermove event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerMove(natureEvent: EventHandleFn<CubeEventType>[]) {
    natureEvent.forEach((handlefn) => {
      // handlefn(this)
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
      // handlefn(this)
    },
    )
  }

  /**
   * raycastGroup
   * handle intersect event
   */
  public raycastGroup(intersets: Intersection<Object3D<Event>>[]) {
    console.log('raycastGroup', intersets)
  }
}

export default Group