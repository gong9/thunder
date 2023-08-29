import { BoxGeometry, Scene, MeshBasicMaterial, Mesh, PerspectiveCamera } from '@anov/3d'

/**
 * example-19
 * cut scene   
 */

const scene = new Scene({
    orbitControls: true
})
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()


const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)
// box.position.set(0, 0, 0)


// const minCamera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000)
// // scene.cutout = true
// scene.cutoutCamera = minCamera
// scene.cutoutArea = { x: 0, y: 0, z: 10 }

scene.add(box)

