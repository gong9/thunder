import { BoxGeometry, SceneControl as Scene, MeshBasicMaterial, Vector3, Mesh, use, MeshLambertMaterial, PMREMGenerator, lib, DirectionalLight, PlaneGeometry, Color } from 'thunder-3d'
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
    rendererOps: {
        shadowMap: true
    },
    reset: true,
})

scene.render(document.querySelector('#app')!)


const PARAMS = {
    hour: 12,
};

const pane = new Pane() as any;

pane.addBinding(PARAMS, 'hour', {
    min: 0,
    max: 24,
    step: 1
});


const date = new Date()

const [sun, updateSunPosition] = createSun(date, 40, 116, 50)

console.log(sun)
scene.add(sun)

const box = new BoxGeometry(5, 5, 5)
const mater = new MeshLambertMaterial()
const mesh = new Mesh(box, mater)
mesh.castShadow = true

const plane = new PlaneGeometry(100, 100)
const planeMesh = new Mesh(plane, new MeshLambertMaterial({ color: '#ccc' }))

planeMesh.rotateX(-Math.PI / 2)
planeMesh.position.set(0, -2, 0)
planeMesh.receiveShadow = true


scene.add(planeMesh)
scene.add(mesh)


use.useframe(() => {

    date.setHours(PARAMS.hour)
    //@ts-ignore
    updateSunPosition(date, 40, 116)

    if ((sun as any).position.y > 0) {
        scene.scene!.background = new Color('#6FDCF7')
    } else {
        scene.scene!.background = new Color('black')
    }
})

