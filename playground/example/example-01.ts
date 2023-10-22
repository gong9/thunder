import { Vector3, Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial, BufferGeometryUtils } from 'thunder-3d'


/**
 * example-01
 * base usage
 */

const scene = new Scene({
  orbitControls: true,
})

const geometry1 = new BoxGeometry(2, 2, 2)
const geometry2 = new BoxGeometry(2, 2, 2)

const box1 = new Mesh(geometry1)
const box2 = new Mesh(geometry2)

geometry1.translate(2, 0, 0); 

geometry2.translate(-2, 0, 0);



const mergedGeometry = BufferGeometryUtils.mergeGeometries([box1.geometry,box2.geometry])
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(mergedGeometry, material)


scene.add(box)
box.position.setX(0)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
