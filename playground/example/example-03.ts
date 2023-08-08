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

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
