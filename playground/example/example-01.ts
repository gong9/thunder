import { BoxGeometry, MeshBasicMaterial } from 'three'
import { TwinsThreeMesh, TwinsThreeScene } from '../../packages/twins-three/src/index'

/**
 * example-01
 * base usage
 */

const scene = new TwinsThreeScene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new TwinsThreeMesh(geometry, material)

box.addNatureEventListener('pointerdown', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})

box.addNatureEventListener('pointermove', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})

box.addNatureEventListener('pointerleave', (object3D) => {
  (object3D.material as any).color.set(0x00FF00)
})

scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
