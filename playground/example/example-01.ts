import { Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial } from 'thunder-3d'


/**
 * example-01
 * base usage
 */

const scene = new Scene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)


box.addNatureEventListener('pointermove', (object3D: any) => {
  (object3D.material).color.set(0xFF0000)
})

box.addNatureEventListener('pointerleave', (object3D: any) => {
  (object3D).color.set(0x00FF00)
})

scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
