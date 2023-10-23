import { CatmullRomCurve3, QuadraticBezierCurve3, Vector3, SceneControl as Scene, BufferGeometry, LineBasicMaterial, Line } from 'thunder-3d'



/**
 * 曲线相关的例子
 */
const scene = new Scene({
    //   orbitControls: true,
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()

const curve = new QuadraticBezierCurve3(
    new Vector3(-10, 0, 0),
    new Vector3(20, 15, 0),
    new Vector3(10, 0, 0),
)

const curve2 = new CatmullRomCurve3(
    [
        new Vector3(-10, 0, 0),
        new Vector3(20, 15, 0),
        new Vector3(10, 0, 0),
    ]
)


const points = curve2.getPoints(100);
const geometry = new BufferGeometry().setFromPoints(points)
const material = new LineBasicMaterial({
    color: "#ffffff"
})

const curveObject = new Line(geometry, material)

scene.add(curveObject)