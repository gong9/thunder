import { TwinsThreeScene } from '../../packages/anov-3d/src/index'

const scene = new TwinsThreeScene({
  orbitControls: true,
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
