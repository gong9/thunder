import type { Camera, Object3D, Vector3 } from 'three'
import { PerspectiveCamera } from 'three'

/**
 * 向目标物体推进
 * @param targetObject3D
 * @param distance
 * @param animationMethod
 * @param duration
 */
const promote = (instance: Camera, targetObject3D: Object3D, distance: number, animationMethod?: string, duration?: number) => {
  const targetPosition = targetObject3D.position
  const cameraPosition = instance.position

  const toward = targetPosition.clone().sub(cameraPosition).normalize()

  const target = targetPosition.clone().add(toward.multiplyScalar(distance))

  instance.position.set(target.x, target.y, target.z)
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
  constructor(fov: number, aspect: number, near: number, far: number) {
    super(fov, aspect, near, far)
  }

  public promote(targetObject3D: Object3D, distance: number, animationMethod?: string, duration?: number) {
    promote(this, targetObject3D, distance, animationMethod, duration)
  }

  public demote = demote
  public surround = surround
}

export { Anov3DPerspectiveCamera }