import { Mesh, Scene,BoxGeometry ,MeshBasicMaterial} from '../../packages/anov-3d/src/index'

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

const geometry2 = new BoxGeometry(2, 2, 2)
const material2 = new MeshBasicMaterial({ color: 0x00FF00 })
const box2 = new Mesh(geometry2, material2)


box.addNatureEventListener('pointermove', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})
box.addNatureEventListener('pointerleave', (object3D) => {
  (object3D.material as any).color.set('#ccc')
})


box2.addNatureEventListener('click', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})
box2.addNatureEventListener('pointerleave', (object3D) => {
  (object3D.material as any).color.set('#fff')
})


box2.position.set(5, 0, 0)
scene.add(box)
scene.add(box2)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
