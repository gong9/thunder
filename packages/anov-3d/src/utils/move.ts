import type { Object3D, Vector3 } from 'three'
import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial } from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { PerspectiveCamera } from '../core/camera'
import globalObjectManage from '../core/global'
import globalControl from '../core/globalControl'

enum AnimationMethod { }

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

export interface ControlsRetuenFuncType {
  remove: () => void
  increaseSpeed: (currentStep: number) => void
  recoverSpeed: () => void
}
type ControlsFuncType = () => ControlsRetuenFuncType

/**
 * 曲线路径移动
 * @param currentObject
 * @param curve
 * @param points 曲线分割数, 同时也决定了运动速度
 * @param lookat 默认曲线方向
 */
export const moveWithLine = (currentObject: Object3D, curve: CatmullRomCurve3, points = 500, lookat?: Vector3) => {
  const totlePoints = curve.getPoints(points)
  const totle = totlePoints.length
  let index = 0
  let step = 1

  const calcIndex = (index: number) => index > totle ? index - totle - 1 : index

  const handleCallback = () => {
    if (index >= totle)
      index = calcIndex(index)

    const nextPoint = totlePoints[calcIndex(index) % totle]
    currentObject.position.set(nextPoint.x, nextPoint.y, nextPoint.z)

    if (lookat)
      currentObject.lookAt(lookat)
    else
      currentObject.lookAt(totlePoints[calcIndex(index + 1) % totle])

    index += step
  }

  globalControl.add(handleCallback, 100000)
  globalControl.start()

  return {
    remove: () => globalControl.remove(handleCallback),
    increaseSpeed: (currentStep = 1) => {
      step = currentStep + step
    },
    recoverSpeed: () => {
      step = 1
    },
  } as ControlsRetuenFuncType
}

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