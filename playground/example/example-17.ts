import { ModelLoader, Scene, Group, Vector3 } from '@anov/3d'

/**
 * example-17
 * fbx 模型加载
 */

const scene = new Scene({
  orbitControls: true,
  ambientLight: true,
  defCameraOps:{
    position: new Vector3(0, 100, 800)
  }
})

const modelLoader = new ModelLoader()

// fbx
modelLoader.loadFbx('./beijing.fbx')!.then((object) => {
  scene.add(object as Group)
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
