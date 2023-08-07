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
box.position.set(0, 0, 0)
box.addNatureEventListener('click', (event) => {
  console.log(event)
})
scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
