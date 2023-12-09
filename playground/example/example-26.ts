import { ModelLoader, SceneControl as Scene, Group, Vector3, InteractionManager, use, AmbientLight, PMREMGenerator, lib, DirectionalLight, Color } from 'thunder-3d'
import { createHighSelectedTool, createSnow, initPostEffects } from 'thunder-utils'

/**
 * example-17
 * fbx 模型加载
 */

const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(0, 10, 80)
    }
})

scene.render(document.querySelector('#app')!)
const ambientLight = new AmbientLight(0xFFFFFF, 10)

const modelLoader = new ModelLoader()

const { renderer, camera } = use.useScene()



initPostEffects(scene.scene!, scene.renderer!, scene.camera!)
createHighSelectedTool({ edgeThickness: 0.01, edgeStrength: 5, visibleEdgeColor: 'red' })

scene.add(ambientLight)
const pmremGenerator = new PMREMGenerator(scene.renderer!)
pmremGenerator.compileEquirectangularShader()
// @ts-expect-error
const roomEnvironment = new lib.RoomEnvironment()


const sun = new DirectionalLight(0xFFFFFF, 10)
sun.position.set(100, 100, -10)
scene.add(sun)

scene.scene!.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture
// fbx
modelLoader.loadGLTF('./meidi.glb')!.then((object) => {
    scene.add(object.scene)
})