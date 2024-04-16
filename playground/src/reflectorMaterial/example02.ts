import { BoxGeometry, Color, Mesh, MeshStandardMaterial, PlaneGeometry, SceneControl, TextureLoader } from 'thunder-3d'
import { createReflectorPlane } from 'thunder-utils'

const scene = new SceneControl({
  orbitControls: true,
  reset: true,
  ambientLight: true,
})

scene.render(document.querySelector('#app')!)

const box = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({
  color: 'red',
}))
scene.add(box)

box.position.y = 3

const box2 = box.clone()
box2.position.x = 2
box2.position.y = 8

box2.material = new MeshStandardMaterial({
  color: 'yellow',
})

scene.add(box2)

const mesh = createReflectorPlane(10, 10, {
  map: new TextureLoader().load('./floor.png'),
})

scene.add(mesh)
