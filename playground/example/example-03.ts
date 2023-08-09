import { ModelType, TwinsThreeModel, TwinsThreeScene } from '../../packages/twins-three/src/index'

/**
 * example-03
 * load gltf model
 */

const scene = new TwinsThreeScene({
  orbitControls: true,
  ambientLight: true,
})
const modelLoader = new TwinsThreeModel()

modelLoader.load(ModelType.GLTF, './tree.glb')!.then((gltf) => {
  scene.add((gltf as any).scene)
})

// fbx
// modelLoader.load(ModelType.FBX, './monkey.glb')!.then((gltf) => {
//   scene.add((gltf as any).scene)
// })

// glb
// modelLoader.load(ModelType.GLB, './monkey.glb')!.then((gltf) => {
//   scene.add((gltf as any).scene)
// })

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
