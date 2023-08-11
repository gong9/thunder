import type { Object3D, Vector3 } from 'three'
import { PerspectiveCamera } from 'three'
import { moveTo } from '../utils/move'

/**
 * 向目标物体后退
 * @param targetObject3D
 * @param distance
 * @param animationMethod
 * @param duration
 */
const demote = (targetObject3D: Object3D, distance: number, animationMethod: string, duration: number) => {}

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
    moveTo(this, targetObject3D, distance, duration, animationMethod)
  }

  public demote = demote
  public surround = surround
}

export { Anov3DPerspectiveCamera }