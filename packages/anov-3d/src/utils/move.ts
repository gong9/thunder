import type { Object3D, Vector3 } from 'three'
import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial } from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { PerspectiveCamera } from '../core/camera'
import globalObjectManage from '../core/global'
import globalControl from '../core/globalControl'

enum AnimationMethod {}

export enum Direction {
  plus = 'plus',
  minus = 'minus',
}

/**
 * moveTo 直线移动
 * @param currentObject3D
 * @param targetObject3D
 * @param direction
 * @param distance
 * @param duration
 * @param animationMethod
 */
export const moveTo = (currentObject3D: Object3D, targetObject3D: Object3D, distance: number, direction: Direction, duration?: number, animationMethod?: string) => {
  const targetPosition = targetObject3D.position
  const cameraPosition = currentObject3D.position

  // 单位方向向量
  let toward = targetPosition.clone().sub(cameraPosition).normalize()

  if (direction === Direction.minus)
    toward = toward.negate()

  const target = cameraPosition.clone().add(toward.multiplyScalar(distance))

  const totalDistance = cameraPosition.distanceTo(targetPosition)
  const currentDistance = cameraPosition.distanceTo(target)

  let lastPosition = target.clone()

  if (direction === Direction.plus && currentDistance > totalDistance)
    lastPosition = targetPosition

  const tween = new TWEEN.Tween(cameraPosition)

  tween.to(lastPosition, duration || 1000)
  tween.start()

  if (currentObject3D instanceof PerspectiveCamera) {
    globalControl.add(() => {
      currentObject3D.lookAt(targetPosition)
    }, (duration || 1000) * 1.01)

    globalControl.start()
  }

  return tween
}

/**
 * create line
 * @param points
 * @returns
 */
const createLine = (points: Vector3[]) => {
  const curve = new CatmullRomCurve3([
    ...points,
  ])

  const curvePoints = curve.getPoints(50)
  const geometry = new BufferGeometry().setFromPoints(curvePoints)
  const material = new LineBasicMaterial({ opacity: 1 })
  return [new Line(geometry, material), curve] as [Line, CatmullRomCurve3]
}

export const moveWithLine = (points: Vector3[], duration?: number) => {
  // const line = createLine(points)
}

/**
 * 圆周运动
 * 1. 一个法向量
 * 2. 一个半径
 * 3. 圆心位置
 * 4. 需要运动的物体
 * 5. 运动的时间
 * 6. 运动的方式
 */

/**
 * base 圆周运动
 * @param currentObject3d
 * @param speed
 * @param duration
 */
export const moveWithRound = (currentObject3d: Object3D, speed = 0.1, duration?: number) => {
  let angle = 0
  let x = 0
  let z = 0

  const handleCallback = () => {
    angle += speed
    x = 4 * Math.sin(angle)
    z = 4 * Math.cos(angle)

    currentObject3d.position.set(x, 0, z)
  }

  globalControl.add(handleCallback, duration)
  globalControl.start()
}

/**
 * move 方法2 移动辅助线
 * todo bug待修复
 * @param currentObject3D
 * @param targetObject3D
 */
export const moveLine = (currentObject3D: Object3D, targetObject3D: Object3D) => {
  const [curveObject, curve] = createLine([
    currentObject3D.position,
    targetObject3D.position,
  ])

  globalObjectManage.scene!.add(curveObject)
}