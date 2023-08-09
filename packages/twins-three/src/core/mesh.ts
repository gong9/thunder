import type { Intersection, Raycaster } from 'three'
import { Mesh } from 'three'
import { debounce } from 'lodash'
import { emitter } from '../utils'
import type { CubeEventType, EventHandleFn } from '../type'

class TwinsThreeMesh extends Mesh {
  private natureEventMap: Map<CubeEventType, EventHandleFn<CubeEventType>[]> = new Map()
  private isMove = false

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
   * handle intersect event
   * @param intersects
   * @param eventType
   */
  private eventHandle(intersects: Intersection[], natureEvent: EventHandleFn<CubeEventType>[]) {
    const intersect = intersects[0]
    const object = intersect.object as TwinsThreeMesh

    if (object === this) {
      // get nature event
      console.log(intersect.object)

      natureEvent.forEach((handlefn) => {
        handlefn(object)
      })
    }
  }

  private debounceEventHandle = debounce(this.eventHandle, 50)

  /**
   * handle pointerleave event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerleave(intersects: Intersection[], natureEvent: EventHandleFn<CubeEventType>[]) {
    if (this.isMove) {
      this.isMove = false

      natureEvent.forEach((handlefn) => {
        handlefn(this)
      })
    }
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

    const pointerupCallback = this.natureEventMap.get('pointerup')
    const pointerdownCallback = this.natureEventMap.get('pointerdown')
    const pointermoveCallback = this.natureEventMap.get('pointermove')
    const pointerleaveCallback = this.natureEventMap.get('pointerleave')

    console.log(intersects)
    if (intersects.length > 0) {
      emitter.on('pointerup', () => pointerupCallback && pointerupCallback.length > 0 && this.debounceEventHandle(intersects, pointerupCallback))
      emitter.on('pointerdown', () => pointerdownCallback && pointerdownCallback.length > 0 && this.debounceEventHandle(intersects, pointerdownCallback))
      emitter.on('pointermove', () => {
        if (pointermoveCallback && pointermoveCallback.length > 0) {
          this.isMove = true
          this.eventHandle(intersects, pointermoveCallback)
        }
      })
    }
    else {
      console.log('pointerleave')
      emitter.on('pointerleave', () => {
        if (pointerleaveCallback && pointerleaveCallback.length > 0 && this.isMove)
          this.handlePointerleave(intersects, pointerleaveCallback)
      })
    }
  }
}

export default TwinsThreeMesh