import { ModelLoader, Color, Scene, AxesHelper, PlaneGeometry, GridHelper, BufferGeometry, LineBasicMaterial, MeshBasicMaterial, Vector3, utils, CatmullRomCurve3, Line, } from '../../packages/anov-3d/src/index'

const modelLoader = new ModelLoader()

const createAxesHelper = (size = 1) => {
    const axesHelper = new AxesHelper(size)

    return axesHelper
}

const createGridHelper = (size = 10, divisions = 10) => {
    const gridHelper = new GridHelper(size, divisions)

    return gridHelper
}

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
})

const axesHelper = createAxesHelper(10)
const gridHelper = createGridHelper(100, 30)

modelLoader.loadGLTF('./car.glb')!.then((gltf) => {
    const car = (gltf as any).scene
    car.scale.set(0.3, 0.3, 0.3)
    const controls = utils.moveWithLine(car, curve as any, 1000)

    let currentSpeed = 1

    const timer = setInterval(() => {
        currentSpeed += 1
        controls.increaseSpeed(currentSpeed)
    }, 500)


    setTimeout(() => {
        clearInterval(timer)
        controls.recoverSpeed()
    }, 10000)

    scene.add(car)
})

// scene.add(axesHelper)
scene.add(gridHelper)

const points = [
    new Vector3(0, 0, 0),
    new Vector3(10, 0, 0),
    new Vector3(10, 0, -10),
    new Vector3(0, 0, -10),
]
const createLine = () => {
    const curve = new CatmullRomCurve3(points, true)

    const geometry = new BufferGeometry().setFromPoints(curve.getPoints(50))
    const material = new LineBasicMaterial({ color: '#fff' })
    return [new Line(geometry, material), curve]
}

const [line, curve] = createLine()

scene.add(line as any)

scene.scene!.background = new Color('#345')
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
