import { BoxGeometry, SceneControl as Scene, Vector3, MeshBasicMaterial, Mesh, PerspectiveCamera } from '@anov/3d'

/**
 * example-19 测试 cutout
 * cut scene   
 */
const scene = new Scene({
    orbitControls: true,
    cutout: true,
})

const minCamera = new PerspectiveCamera(90, 1, 0.1, 5000)

minCamera.position.copy(new Vector3(0, 5, 10))
scene.cutoutCamera = minCamera
scene.cutoutArea = { x: 0, y: 0, width: 200, height: 200 }

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

scene.add(minCamera)
scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()





