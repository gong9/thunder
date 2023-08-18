import type { Vector3 } from 'three'
import { BoxGeometry, BufferAttribute, BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, Mesh, MeshBasicMaterial } from 'three'
import globalObjectManage from './global'

const createSplineControlObject3d = (position: Vector3) => {
    const boxGeometry = new BoxGeometry(20, 20, 20)
    const material = new MeshBasicMaterial({ color: Math.random() * 0xFFFFFF })
    const object = new Mesh(boxGeometry, material)
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
        color: 0xFF0000,
        opacity: 0.35,
    }))

    return curve
}

export const createControlLine = (points: Vector3[]) => {
    const splineControlObject3d: Mesh<BoxGeometry, MeshBasicMaterial>[] = []

    points.forEach((point: Vector3) => {
        splineControlObject3d.push(createSplineControlObject3d(point))
    })

    createCatmullRomCurve3(points)
}