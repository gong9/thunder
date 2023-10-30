import { Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial, createTransformControls } from '../../packages/thunder-3d/src/index'


/**
 * example-12
 * transformControl
 */

const scene = new Scene({
  orbitControls: true,
})
scene.render(document.querySelector('#app')!)


const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

const transformControls = createTransformControls(scene.camera!, scene.domElement!, 0.5)

box.addNatureEventListener('pointermove', (object3D) => {
  transformControls.attach(object3D)
})

scene.add(box)

