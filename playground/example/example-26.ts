import { BoxGeometry, SceneControl as Scene, MeshBasicMaterial, Vector3, Mesh, use, AmbientLight, PMREMGenerator, lib, DirectionalLight, Color } from 'thunder-3d'
import { createSun,  } from 'thunder-utils'

/**
 * example-17
 * fbx 模型加载
 */

const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(0, 10, 80)
    },
    reset:true,
    rendererOps: {
        size: {
            width: 300,
            height: 300
        }
    },
})

scene.render(document.querySelector('#app')!)

const sun = createSun(new Date(),116,40)

console.log(sun)
scene.add(sun)

const box = new BoxGeometry(1, 1, 1)
const mater = new MeshBasicMaterial({ color: 'red' })
const mesh = new Mesh(box, mater)

const helper = new ViewHelper(scene.camera!, scene.renderer!, "top-right");


scene.add(mesh)




