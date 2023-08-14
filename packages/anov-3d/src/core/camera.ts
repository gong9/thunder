import type { Object3D, Vector3 } from 'three'
import { PerspectiveCamera } from 'three'
import { Direction, moveTo } from '../utils/move'

/**
 * 相机围绕目标物体旋转
 * @param targetObject3D
 * @param radius
 * @param toward
 */
const surround = (targetObject3D: Object3D, radius: number, toward: Vector3) => {}

class Anov3DPerspectiveCamera extends PerspectiveCamera {
  constructor(fov: number, aspect: number, near: number, far: number) {
    super(fov, aspect, near, far)
  }

  /**
   * 向目标物体推进
   * @param targetObject3D
   * @param distance
   * @param duration
   * @param animationMethod
   */
  public promote(targetObject3D: Object3D, distance: number, duration?: number, animationMethod?: string) {
    return moveTo(this, targetObject3D, distance, Direction.plus, duration, animationMethod)
  }

  /**
   * 向目标物体推进
   * @param targetObject3D
   * @param distance
   * @param duration
   * @param animationMethod
   */
  public demote = (targetObject3D: Object3D, distance: number, duration?: number, animationMethod?: string) => {
    return moveTo(this, targetObject3D, distance, Direction.minus, duration, animationMethod)
  }

  public surround = surround
}

export { Anov3DPerspectiveCamera }