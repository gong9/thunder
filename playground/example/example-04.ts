import { TwinsThreeScene } from '../../packages/twins-three/src/index'

const scene = new TwinsThreeScene({
  orbitControls: true,
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
