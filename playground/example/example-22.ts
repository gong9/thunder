import { SceneControl as Scene, Mesh, BufferGeometry, DoubleSide, BoxGeometry, MeshBasicMaterial, RepeatWrapping, Line, Quaternion, LineBasicMaterial, Vector3 } from 'thunder-3d'
import data from '../data/cad.json'

/**
 * example-01
 * base usage
 */

const scene = new Scene({
    orbitControls: true,
})

scene.render(document.querySelector('#app')!)


const createBoxGeometryByPoints = (a: Vector3, b: Vector3, height = 1, depth = 0.2) => {
    // step 1: get position
    const width = a.distanceTo(b)
    const box = new BoxGeometry(width, height, depth)



    const material = new MeshBasicMaterial({ side: DoubleSide, color: '#ac7c6a' })
    const mesh = new Mesh(box, material)

    // get center point
    const midpoint = new Vector3().addVectors(a, b).multiplyScalar(0.5)

    const position = new Vector3(midpoint.x, midpoint.y + height / 2, midpoint.z)
    mesh.position.x = midpoint.x
    mesh.position.y = midpoint.y + height / 2
    mesh.position.z = midpoint.z

    // step 2: rotate box
    const direction = new Vector3()
    direction.subVectors(a, b)
    direction.normalize()

    const axis = new Vector3(0, 1, 0) // axis
    const angle = new Vector3(1, 0, 0).angleTo(direction)

    const quaternion = new Quaternion().setFromAxisAngle(axis, angle)
    const newDirection = new Vector3(1, 0, 0).applyQuaternion(quaternion)

    if (!newDirection.angleTo(direction))
        mesh.rotateOnAxis(axis, angle)
    else
        mesh.rotateOnAxis(axis, -angle)

    return mesh
}


for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'LINE') {
       
        const { start, end } = data[i]
        const a = new Vector3(start?.x, start?.y, start?.z)
        const b = new Vector3(end?.x, end?.y, end?.z)
        const geo = new BufferGeometry().setFromPoints([a, b])
        const mesh = createBoxGeometryByPoints(a, b)
        const line = new Line(geo, new LineBasicMaterial({ color: 0x00ff00 }))
        scene.add(line)
        // scene.add(mesh)
    }
}
