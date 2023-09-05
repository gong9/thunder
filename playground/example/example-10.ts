import { Color, SceneControl as Scene, Mesh, PlaneGeometry, BufferGeometry, LineBasicMaterial, Line, MeshBasicMaterial, Vector3, CatmullRomCurve3 } from '../../packages/anov-3d/src/index'

const createPlane = () => {
    const geometry = new PlaneGeometry(100, 100);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const plane = new Mesh(geometry, material);
    return plane
}

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
})

const plane = createPlane()
plane.rotateX(-Math.PI / 2)


const points: Vector3[] = []

plane.addNatureEventListener('click', (object, res) => {
    points.push(res!.point)

    console.log(points)
})

const createLine = () => {
    const curve = new CatmullRomCurve3(points, true)

    const geometry = new BufferGeometry().setFromPoints(curve.getPoints(50))
    const material = new LineBasicMaterial({ color: '#fff' })
    const line = new Line(geometry, material)
}

scene.add(plane)
scene.scene!.background = new Color('#345')
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate(() => {
    createLine()
})
