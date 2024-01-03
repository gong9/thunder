import { PlaneGeometry, SceneControl as Scene, Mesh, Vector3, use } from 'thunder-3d'
import { GridMaterial,ViewHelper } from 'thunder-utils'

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

const geometry = new PlaneGeometry(10000, 10000)
const material = new GridMaterial()

const mesh = new Mesh(geometry, material)
mesh.rotateX(-Math.PI / 2)

scene.add(mesh)

const helper = new ViewHelper(scene.camera!, scene.renderer!, "top-right");

helper.setControls(scene.controls!);



use.useframe(()=>{
    helper.render();
})