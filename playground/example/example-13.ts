import { Color, Vector3, Scene, TransformControls, createTransformControls, createControlLine } from '../../packages/anov-3d/src/index'


/**
 * example-13
 * line-transformControl
 */

const scene = new Scene({
  orbitControls: true,
})

const points = [
  new Vector3(-5, 0, 0),
  new Vector3(0, 0, 0),
  new Vector3(5, 0, 0)
]

createTransformControls(0.7).then((control) => {
  const curve = createControlLine(points, control)
  scene.add(control)
  scene.add(curve.mesh)
})

scene.render(document.querySelector('#app')!)
scene.scene!.background = new Color(0xf0f0f0);
scene.startFrameAnimate()
