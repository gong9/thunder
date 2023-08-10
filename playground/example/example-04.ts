import { BoxGeometry, MeshBasicMaterial } from 'three'
import { Anov3DMesh, Anove3DScene } from '../../packages/anov-3d/src/index'

/**
 * 测试相机的基本行为
 */

const scene = new Anove3DScene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Anov3DMesh(geometry, material)

scene.add(box)
box.position.set(0, 0, -100)

setTimeout(() => {
  scene.camera!.promote(box, 20)
}, 1000)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
