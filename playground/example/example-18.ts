import { ModelLoader, SceneControl as Scene, Group, Vector3 } from 'thunder-3d'

/**
 * example-18
 * 测试模型鼠标交互
 */

const scene = new Scene({
  orbitControls: true,
  ambientLight: true,
  defCameraOps:{
    position: new Vector3(0, 100, 800)
  }
})

const modelLoader = new ModelLoader()
const group = new Group()

// fbx
modelLoader.loadFbx('./beijing.fbx')!.then((object) => {
    group.addModel(object as Group)
    scene.add(group)
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
