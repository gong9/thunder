import { BoxGeometry, Color, Mesh, MeshStandardMaterial, PlaneGeometry, SceneControl, TextureLoader } from 'thunder-3d'
import { ReflectorMaterial, reflector } from 'thunder-utils'

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

const props = {
  reflectivity: 0.2, // 反射率
  mirror: 0.1, // 镜面率
  mixStrength: 9, // 混合强度
  showGridHelper: true,
  color: '#ffffff',
  position: [0, -1, 0],
  scale: 1.0,
}

const material = new ReflectorMaterial({
  reflectivity: props.reflectivity, // 反射率
  mirror: props.mirror,
  mixStrength: props.mixStrength,
  color: new Color(props.color),
  map: new TextureLoader().load('./floor.png'),
  fog: scene.scene.fog as any,
  dithering: true,
})

const geometry = new PlaneGeometry(10, 10)
const meshOB = new Mesh(geometry, material)

meshOB.position.y = -0.01
meshOB.rotation.x = -Math.PI / 2
meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
  meshOB.visible = false
  reflector.update(rendererSelf, sceneSelf, cameraSelf)
  meshOB.visible = true
}

scene.add(meshOB)

scene.scene.background = new Color('#201919')