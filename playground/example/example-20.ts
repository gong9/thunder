import { BoxGeometry, SceneControl as Scene, Group, MeshBasicMaterial, Mesh, PerspectiveCamera } from '@anov/3d'



/**
 * example-20 测试 group
 * cut scene   
 */
const scene = new Scene({
    orbitControls: true,
})

const group = new Group()


const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

group.addNatureEventListener('pointermove', (object3D) => {
    object3D.children[0].material.color.set(0xFF0000)
})

group.addNatureEventListener('pointerleave', (object3D) => {
    object3D.children[0].material.color.set(0x00FF00)
})

group.add(box)
scene.add(group)

// scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()





