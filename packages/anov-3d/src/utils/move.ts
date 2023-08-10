import type { Object3D } from 'three'
import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial } from 'three'
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

  // 单位方向向量
  const toward = targetPosition.clone().sub(cameraPosition).normalize()
  const target = cameraPosition.clone().add(toward.multiplyScalar(distance))

  const totalDistance = cameraPosition.distanceTo(targetPosition)
  const currentDistance = cameraPosition.distanceTo(target)

  let lastPosition = target.clone()

  console.log('totalDistance', totalDistance, 'currentDistance', currentDistance)

  if (currentDistance > totalDistance)
    lastPosition = targetPosition

  const tween = new TWEEN.Tween(cameraPosition)

  tween.to(lastPosition, duration || 1000)
  tween.start()
}

/**
 * move 方法2 借助曲线
 * @param currentObject3D
 * @param targetObject3D
 * @param distance
 * @param duration
 * @param animationMethod
 */
export const move = (currentObject3D: Object3D, targetObject3D: Object3D, duration?: number, animationMethod?: string) => {
  const curve = new CatmullRomCurve3([
    currentObject3D.position,
    targetObject3D.position,
  ])

  const points = curve.getPoints(50)
  const geometry = new BufferGeometry().setFromPoints(points)
  const material = new LineBasicMaterial({ opacity: 1 })
  const curveObject = new Line(geometry, material)

  currentObject3D.add(curveObject)
}