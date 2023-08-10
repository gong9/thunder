import { Anov3DPerspectiveCamera, Anove3DScene } from '../../packages/anov-3d/src/index'

/**
 * 测试相机的基本行为
 */

const scene = new Anove3DScene({
  orbitControls: true,
})

// const camera = new Anov3DPerspectiveCamera(50, 1, 0.1, 2000)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
