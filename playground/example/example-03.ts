import { ModelLoader, Scene } from '../../packages/anov-3d/src/index'

/**
 * example-03
 * load gltf model
 */

const scene = new Scene({
  orbitControls: true,
  ambientLight: true,
})
const modelLoader = new ModelLoader()

// gltf 资源调试时需要手动放入dist目录
modelLoader.loadGLTF('./tree.glb')!.then((gltf) => {
  scene.add((gltf as any).scene)
})

// fbx
// modelLoader.loadFbx('./monkey.glb')!.then((gltf) => {
//   scene.add((gltf as any).scene)
// })

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
