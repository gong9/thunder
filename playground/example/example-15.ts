import { SceneControl as Scene, Vector3, Mesh, BoxGeometry, MeshBasicMaterial } from '@anov/3d'
import { createSnow } from '@anov/3d-utils'

/**
 * example-15
 * base usage
 */

const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(0, 150, -200)
    }
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)


const [start, stop] = createSnow(10, 1000, {
    x: 1,
    y: 20,
}, 1, 600)


start()
setTimeout(()=>{
    stop()
},2000)

scene.add(box)
console.log(scene.scene?.children)
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
