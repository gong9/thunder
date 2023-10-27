import { Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial } from 'thunder-3d'
import { initPostEffects, createHighSelectedTool } from 'thunder-utils'


/**
 * 物体边缘高亮
 */
const scene = new Scene({
    orbitControls: true,
})
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

scene.add(box)

initPostEffects(scene.scene!, scene.renderer!, scene.camera!)

const highSelected = createHighSelectedTool()

box.addNatureEventListener('pointermove', () => {
    highSelected([box])
})

box.addNatureEventListener('pointerleave', () => {
    highSelected([])
})


