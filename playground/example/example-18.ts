import { ModelLoader, Scene, Group, Vector3 } from '@anov/3d'

/**
 * example-17
 * load fbx model
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
