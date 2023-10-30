import { ModelLoader, SceneControl as Scene } from 'thunder-3d'

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

