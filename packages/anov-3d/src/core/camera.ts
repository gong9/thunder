import type { Object3D, Vector3 } from 'three'
import { PerspectiveCamera } from 'three'

/**
 * 向目标物体推进
 * @param targetObject3D
 * @param distance
 * @param animationMethod
 * @param duration
 */
const promote = (targetObject3D: Object3D, distance: number, animationMethod: string, duration: number) => {

}

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
  constructor(fov = 50, aspect = 1, near: 0.1, far = 2000) {
    super(fov, aspect, near, far)
  }

  public promote = promote
  public demote = demote
  public surround = surround
}

export { Anov3DPerspectiveCamera }