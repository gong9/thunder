import { BoxGeometry, MeshBasicMaterial } from 'three'
import { TwinsThreeMesh, TwinsThreeScene } from '../../packages/twins-three/src/index'

const scene = new TwinsThreeScene({
  orbitControls: true,
})

const createBox = () => {
  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  return new TwinsThreeMesh(geometry, material)
}

const box = createBox()
box.addNatureEventListener('click', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})

scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
