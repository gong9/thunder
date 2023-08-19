import { BoxGeometry, BufferAttribute, BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, MeshBasicMaterial, Vector3 } from 'three'
import type { TransformControls } from './control/transformControls'
import Mesh from './mesh'
import globalObjectManage from './global/global'

const point = new Vector3(0, 0, 0)

const createSplineControlObject3d = (position: Vector3, transformControl: TransformControls, width = 1, height = 1, depth = 1) => {
    const boxGeometry = new BoxGeometry(width, height, depth)
    const material = new MeshBasicMaterial({ color: Math.random() * 0xFFFFFF })
    const object = new Mesh(boxGeometry, material)

    object.addNatureEventListener('pointermove', (mesh) => {
        transformControl.attach(mesh)
    })

    object.position.copy(position)
    globalObjectManage.scene!.add(object)

    return object
}

type CatmullRomCurve3WithMesh = CatmullRomCurve3 & {
    mesh: Line
}

const createCatmullRomCurve3 = (positions: Vector3[]) => {
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(200 * 3), 3))

    const curve = new CatmullRomCurve3(positions) as CatmullRomCurve3WithMesh
    curve.mesh = new Line(geometry.clone(), new LineBasicMaterial({
        color: 'red',
        opacity: 1,
    }))

    return curve
}

const updateCatmullRomCurve3 = (curve: CatmullRomCurve3WithMesh) => {
    const splineMesh = curve.mesh
    const position = splineMesh.geometry.attributes.position

    // update 200 points
    for (let i = 0; i < 200; i++) {
        const t = i / (200 - 1)
        curve.getPoint(t, point)
        position.setXYZ(i, point.x, point.y, point.z)
    }

    position.needsUpdate = true
}

/**
 * 可控制曲线
 * @param points
 * @param transformControl
 * @returns
 */
export const createControlLine = (points: Vector3[], transformControl: TransformControls) => {
    const splineControlObject3d: Mesh[] = []

    points.forEach((point: Vector3) => {
        splineControlObject3d.push(createSplineControlObject3d(point, transformControl))
    })

    const curve = createCatmullRomCurve3(points)

    updateCatmullRomCurve3(curve)

    transformControl.addEventListener('objectChange', () => {
        updateCatmullRomCurve3(curve)
    })

    return curve
}