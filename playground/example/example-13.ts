import { Color, Vector3, Scene, TransformControls, createTransformControls, createControlLine } from '../../packages/anov-3d/src/index'


/**
 * example-13
 * line-transformControl
 */

const scene = new Scene({
  orbitControls: true,
})

let transformControl: TransformControls | null = null

const points = [new Vector3(2, 4, 5),
new Vector3(- 57, 1, - 1),
new Vector3(- 9, 17, - 6)
]

createTransformControls().then((control) => {
  transformControl = control
  scene.add(transformControl)

  const curve = createControlLine(points, transformControl)
  scene.add(curve.mesh)
})

scene.render(document.querySelector('#app')!)
scene.scene!.background = new Color(0xf0f0f0);
scene.camera?.position.set(0, 0, 20);
scene.startFrameAnimate()
