import { BoxGeometry, SceneControl as Scene, MeshBasicMaterial, Vector3, Mesh, use, AmbientLight, PMREMGenerator, lib, DirectionalLight, PlaneGeometry } from 'thunder-3d'
import { createSun, } from 'thunder-utils'
import { Pane } from 'tweakpane';


/**
 * 模拟太阳移动
 */
const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(-86.34228807025393, 4.924101067363955, -4.55659077292372)
    },
    reset: true,
})

scene.render(document.querySelector('#app')!)


const PARAMS = {
    时间: 0,
};

const pane = new Pane() as any;

pane.addBinding(PARAMS, '时间', {
    min: 0,
    max: 24,
    step: 1
});


const date = new Date()

const [sun, updateSunPosition] = createSun(date, 40, 116, 10)

console.log(sun)
scene.add(sun)

const box = new BoxGeometry(1, 1, 1)
const mater = new MeshBasicMaterial({ color: 'red' })
const mesh = new Mesh(box, mater)

const plane = new PlaneGeometry(30, 30)
const planeMesh = new Mesh(plane, mater)
planeMesh.rotateX(-Math.PI / 2)
planeMesh.position.set(0, 0, 0)
scene.add(planeMesh)
scene.add(mesh)


use.useframe(() => {

    date.setHours(PARAMS.时间)
    //@ts-ignore
    updateSunPosition(date, 40, 116)

    console.log(scene.camera?.position)
})