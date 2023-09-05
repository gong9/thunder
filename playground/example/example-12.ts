import { Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial, createTransformControls, TransformControls } from '../../packages/anov-3d/src/index'


/**
 * example-12
 * transformControl
 */

const scene = new Scene({
  orbitControls: true,
})

let transformControl: TransformControls | null = null

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

createTransformControls().then((transformControls) => {
  transformControl = transformControls
  scene.add(transformControl)
})

box.addNatureEventListener('pointermove', (object3D) => {
  transformControl && transformControl.attach(object3D)
})

scene.add(box)
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
