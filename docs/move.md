# move

## 物体之间的相向移动

API: `moveTo = (currentObject3D: Object3D, targetObject3D: Object3D, distance: number, direction: Direction, duration?: number, animationMethod?: string) =>void `

- currentObject3D 当前物体
- targetObject3D 目标物体
- distance 移动距离 (相向移动时默认移动的最大距离就是两点之间的距离)
- direction 移动方向 （相向还是相反运动）
- duration 动画时间
- animationMethod 动画方法

## 物体的曲线运动

API: `
moveWithLine = (currentObject: Object3D, curve: CatmullRomCurve3, points = 500, offset: OffsetType = { x: 0, y: 0, z: 0 }, lookat?: Vector3) => {
    remove: ()=>void,
    increaseSpeed: (currentStep)=>void,
    recoverSpeed: ()=>void,
}
`
- currentObject3D 当前物体
- curve 曲线 (CatmullRomCurve3)
- points 曲线上的点数
- offset 物体在曲线上的偏移量 （默认：{ x: 0, y: 0, z: 0 }）
- lookat 物体的朝向 （默认为曲线切线方向）
