import { ModelLoader, TransformControls, SceneControl as Scene, Group, Vector3, createTransformControls } from '@anov/3d'

/**
 * example-20
 * group 交互
 */

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
    defCameraOps: {
        position: new Vector3(0, 100, 800)
    }
})
let transformControl: TransformControls | null = null
const modelLoader = new ModelLoader()
const group = new Group()

createTransformControls().then((transformControls) => {
    transformControl = transformControls
    scene.add(transformControl)
})

// fbx
modelLoader.loadFbx('./beijing.fbx')!.then((object) => {

    group.addNatureEventListener('click', (object3D) => {
        console.log('group click', object3D)
    })
    
    console.log(group)
    group.add(object as Group)
    scene.add(group)
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
