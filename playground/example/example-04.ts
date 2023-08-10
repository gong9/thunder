import { Anove3DScene } from '../../packages/anov-3d/src/index'

const scene = new Anove3DScene({
  orbitControls: true,
})

// console.log(Anov3DPerspectiveCamera)
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
