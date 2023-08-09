import { Color } from 'three'
import { ModelType, TwinsThreeModel, TwinsThreeScene } from '../../packages/twins-three/src/index'

/**
 * example-03
 * load gltf model
 */

const scene = new TwinsThreeScene({
  orbitControls: true,
})
const modelLoader = new TwinsThreeModel()

modelLoader.load(ModelType.GLTF, './monkey.glb')!.then((gltf) => {
  scene.add((gltf as any).scene)
})

scene.scene!.background = new Color('#222')
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
