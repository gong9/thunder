import type { Intersection, Object3D, Raycaster } from 'three'
import { Mesh as TMesh } from 'three'
import { debounce } from 'lodash'
import { getObject3dAncestorsNodes } from '../utils'
import type { CubeEventType, EventHandleFn } from '../type'
import Group from './group'
import globalObjectManage from './global/global'

class Mesh extends TMesh {
  private natureEventMap: Map<CubeEventType, EventHandleFn[]> = new Map()
  private entered = false

  constructor(geometry?: ConstructorParameters<typeof TMesh>[0], material?: ConstructorParameters<typeof TMesh>[1]) {
    super(geometry, material)
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
  private handleClick = debounce((natureEvent: EventHandleFn[], intersect: Intersection) => {
    if (!globalObjectManage.triggerClick)
      return

    // get nature event
    natureEvent.forEach((handlefn) => {
      handlefn(this, intersect)
    })
  }, 20)

  /**
   * handle pointermove event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerMove = (natureEvent: EventHandleFn[], intersect: Intersection) => {
    natureEvent.forEach((handlefn) => {
      handlefn(this, intersect)
    })
  }

  /**
   * handle pointerleave event
   * @param intersects
   * @param natureEvent
   */
  private handlePointerleave = () => {
    const pointerleaveCallback = this.natureEventMap.get('pointerleave')
    pointerleaveCallback && pointerleaveCallback.length > 0 && pointerleaveCallback.forEach((handlefn) => {
      handlefn(this)
    },
    )
  }

  /**
   * handle bubbling 伪冒泡，仅触发上层group事件
   * @param object3d
   */
  private handleBubble(object3d: Object3D | undefined) {
    if (object3d) {
      const ancestorObject3d = getObject3dAncestorsNodes(object3d, object3d => object3d instanceof Group) as Group[]

      for (let i = 0; i < ancestorObject3d.length; i++)
        ancestorObject3d[i].raycastGroup()
    }
  }

  /**
   * emit parent group mouseleave event
   * @param object3d
   */
  private cancelAncestorsBubble(object3d: Object3D | undefined) {
    if (object3d) {
      const ancestorObject3d = getObject3dAncestorsNodes(object3d, object3d => object3d instanceof Group) as Group[]

      for (let i = 0; i < ancestorObject3d.length; i++)
        ancestorObject3d[i].cancel()
    }
  }

  /**
   * handle mesh raycaster
   * @param raycaster
   * @param intersects
   */
  public raycast(raycaster: Raycaster, intersects: Intersection[]) {
    super.raycast(raycaster, intersects)

    const intersect = intersects[0]
    const object = intersect && intersect.object

    object === this && this.handleBubble(this)

    if (object !== this)
      this.cancelAncestorsBubble(this)

    if (this.natureEventMap.size === 0)
      return

    const clickCallback = this.natureEventMap.get('click')
    const pointerupCallback = this.natureEventMap.get('pointerup')
    const pointerdownCallback = this.natureEventMap.get('pointerdown')
    const pointermoveCallback = this.natureEventMap.get('pointermove')

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