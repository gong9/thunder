import type { Intersection, Object3D } from 'three'
import { Group as TGroup } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'
import globalObjectManage from './global/global'

class Group extends TGroup {
  private natureEventMap: Map<CubeEventType, ((object3d: Object3D) => void)[]> = new Map()
  private entered = false

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
  }

  /**
   * addNatureEventListener
   * @param type
   * @param handlefn
   */
  public addNatureEventListener<T extends CubeEventType>(type: T, handlefn: EventHandleFn) {
    if (!this.natureEventMap.has(type))
      this.natureEventMap.set(type, [])

    this.natureEventMap.get(type)!.push(handlefn)
  }

  /**
   * removeNatureEventListener
   * @param type
   * @param handlefn
   */
  public removeNatureEventListener<T extends CubeEventType>(type: T, handlefn: EventHandleFn) {
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
  private handleClick(natureEvent: EventHandleFn[]) {
    if (!globalObjectManage.triggerClick)
      return

    // get nature event
    natureEvent.forEach((handlefn) => {
      handlefn(this)
    })
  }

  /**
   * handle pointermove event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerMove(natureEvent: EventHandleFn[]) {
    natureEvent.forEach((handlefn) => {
      handlefn(this)
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
   * raycast group
   * handle intersect event
   */
  public raycastGroup() {
    const clickCallback = this.natureEventMap.get('click')
    const pointerupCallback = this.natureEventMap.get('pointerup')
    const pointerdownCallback = this.natureEventMap.get('pointerdown')
    const pointermoveCallback = this.natureEventMap.get('pointermove')

    this.entered = true

    clickCallback && clickCallback.length > 0 && this.handleClick(clickCallback)
    pointerupCallback && pointerupCallback.length > 0 && this.handleClick(pointerupCallback)
    pointerdownCallback && pointerdownCallback.length > 0 && this.handleClick(pointerdownCallback)
    pointermoveCallback && pointermoveCallback.length > 0 && this.handlePointerMove(pointermoveCallback)
  }

  /**
   * cancel bubbling
   */
  public cancel() {
    if (this.entered) {
      this.handlePointerleave()
      this.entered = false
    }
  }
}

export default Group