import { AxesHelper, BoxGeometry, GridHelper, MeshBasicMaterial, Mesh, SceneControl as Scene, Direction, utils } from '../../packages/anov-3d/src/index'

const createAxesHelper = (size = 1) => {
  const axesHelper = new AxesHelper(size)

  return axesHelper
}

const createGridHelper = (size = 10, divisions = 10) => {
  const gridHelper = new GridHelper(size, divisions)

  return gridHelper
}

/**
 * 物体运动
 */

const scene = new Scene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

const geometry2 = new BoxGeometry(2, 2, 2)
const materia2 = new MeshBasicMaterial({ color: '#ccc' })
const box2 = new Mesh(geometry2, materia2)

const axesHelper = createAxesHelper(10)
const gridHelper = createGridHelper(100, 30)

box.position.set(0, 0, 0)
box2.position.set(10, 0, 0)

scene.add(box)
scene.add(box2)
scene.add(axesHelper)
scene.add(gridHelper)

utils.moveLine(box, box2)
utils.moveTo(box, box2, 100, Direction.plus, 1000)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
