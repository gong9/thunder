
import { BoxGeometry, MeshBasicMaterial, Color, Mesh, Scene, dom, createLabel } from '../../packages/anov-3d/src/index'

/**
 * add label
 */

const scene = new Scene({
  orbitControls: true,
  css2DRenderer: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

box.addNatureEventListener('pointermove', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})
box.addNatureEventListener('pointerleave', (object3D) => {
  (object3D.material as any).color.set('#ccc')
})

const labelObject2d = createLabel(dom.createElement("div", {
  id: "el-id",
  class: "class-a class-b",
  textContent: "测试",
}))

labelObject2d.position.set(0, 3, 0)
box.add(labelObject2d)

scene.add(box)
scene.scene!.background = new Color('#ccc')

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
