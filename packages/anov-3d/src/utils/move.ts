import type { Object3D } from 'three'
import * as TWEEN from '@tweenjs/tween.js'

/**
 * moveTo
 * @param currentObject3D
 * @param targetObject3D
 * @param distance
 * @param animationMethod
 * @param duration
 */
export const moveTo = (currentObject3D: Object3D, targetObject3D: Object3D, distance: number, duration?: number, animationMethod?: string) => {
  const targetPosition = targetObject3D.position
  const cameraPosition = currentObject3D.position

  const toward = targetPosition.clone().sub(cameraPosition).normalize()
  const target = targetPosition.clone().add(toward.multiplyScalar(distance))

  const tween = new TWEEN.Tween(currentObject3D.position)

  tween.to(target, duration || 1000)
  tween.start()
}