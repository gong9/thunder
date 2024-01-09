import { BoxGeometry, CameraHelper, AmbientLight, ModelLoader, PMREMGenerator, SphereGeometry, MeshBasicMaterial, SceneControl as Scene, Vector3, Mesh, use, MeshLambertMaterial, MathUtils, lib, DirectionalLight, PlaneGeometry, Group } from 'thunder-3d'
import { createSun, } from 'thunder-utils'
import { Pane } from 'tweakpane';

const Sky = lib.Sky

const loader = new ModelLoader()

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
    ambientLight: true
})

scene.render(document.querySelector('#app')!)


const PARAMS = {
    hour: 12,
};

const pane = new Pane() as any;

pane.addBinding(PARAMS, 'hour', {
    min: 0,
    max: 24,
    step: 0.1
});


const date = new Date()

const [sun, updateSunPosition, getSunPosition] = createSun(date, 40, 116, 50)

// scene.add(sun)


// use.useframe(() => {

//     date.setHours(PARAMS.hour)
//     //@ts-ignore
//     updateSunPosition(date, 40, 116)

//     if ((sun as any).position.y > 0) {
//         scene.scene!.background = new Color('#6FDCF7')
//     } else {
//         scene.scene!.background = new Color('black')
//     }
// })


const sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky);

const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: scene.renderer!.toneMappingExposure
};

const sun1 = new Vector3();

//@ts-ignore
const uniforms = sky.material.uniforms;
uniforms['turbidity'].value = effectController.turbidity;
uniforms['rayleigh'].value = effectController.rayleigh;
uniforms['mieCoefficient'].value = effectController.mieCoefficient;
uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

const phi = MathUtils.degToRad(90 - effectController.elevation);
const theta = MathUtils.degToRad(effectController.azimuth);

sun1.setFromSphericalCoords(1, phi, theta);

uniforms['sunPosition'].value.copy(sun1);

const createSunEntity = () => {
    const box = new SphereGeometry(1)
    const mater = new MeshBasicMaterial({ color: 'yellow' })
    const mesh = new Mesh(box, mater)

    return mesh
}

const createSunLight = () => {
    const sunLight = new DirectionalLight('white', 1)
    sunLight.castShadow = true
    sunLight.shadow.bias = -0.005
    sunLight.shadow.mapSize.set(1024, 1024)
    const cam = sunLight.shadow.camera;
    console.log(cam);
    cam.near = 1;
    cam.far = 50;
    cam.left = -100;
    cam.right = 100;
    cam.top = 100;
    cam.bottom = -100

    const cameraHelper = new CameraHelper(cam);
    scene.add(cameraHelper);
    cameraHelper.visible = false;

    return sunLight
}

const sun2 = createSunEntity()
const light = createSunLight()



const group = new Group()

group.add(sun2, light)
scene.add(group)

loader.loadGLTF(
    './meidi2.glb',
    false,
    true,
    './draco/',
    (model) => {

        model.scene!.traverse((child) => {

            if (child.castShadow !== undefined) {
                // 开启投射影响
                child.castShadow = true;
                // 开启被投射阴影
                child.receiveShadow = true;
            }


        })

        model.scene.scale.setScalar(0.1)
        console.log(model.scene)
        scene.add(model.scene)



        const box = new BoxGeometry(5, 5, 5)
        const mater = new MeshLambertMaterial()
        const mesh = new Mesh(box, mater)
        mesh.castShadow = true

        const plane = new PlaneGeometry(10000, 10000)
        const planeMesh = new Mesh(plane, new MeshLambertMaterial({ color: 'yellow' }))

        planeMesh.rotateX(-Math.PI / 2)
        planeMesh.position.set(0, -2, 0)
        planeMesh.receiveShadow = true



        scene.add(planeMesh)
        scene.add(mesh)

    })

const pmremGenerator = new PMREMGenerator(scene.renderer!)
pmremGenerator.compileEquirectangularShader()
// @ts-expect-error
const roomEnvironment = new lib.RoomEnvironment()
scene.scene!.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture



use.useframe(() => {

    date.setHours(PARAMS.hour)
    //@ts-ignore
    const { altitude, azimuth } = getSunPosition(date, 40, 116)
    const phi = MathUtils.degToRad(90 - MathUtils.radToDeg(altitude));
    sun1.setFromSphericalCoords(1, phi, azimuth);

    uniforms['sunPosition'].value.copy(sun1);
    const x = 100 * (Math.cos(altitude)) * (Math.cos(azimuth))
    const z = 100 * (Math.cos(altitude)) * (Math.sin(azimuth))
    const y = 100 * (Math.sin(altitude))

    group.position.copy(sun1)

    if (y <= 0) {
        console.log('太阳下山了')
        scene.scene!.environment = null
        light.intensity = 1
        light.castShadow = false
    } else {
        scene.scene!.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture
        light.intensity = 1
        light.castShadow = true

    }
})
