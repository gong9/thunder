import { AxesHelper, BoxGeometry, GridHelper, MeshBasicMaterial } from 'three'
import { Anov3DMesh, Anove3DScene, utils } from '../../packages/anov-3d/src/index'

const createAxesHelper = (size = 1) => {
  const axesHelper = new AxesHelper(size)

  return axesHelper
}

const createGridHelper = (size = 10, divisions = 10) => {
  const gridHelper = new GridHelper(size, divisions)

  return gridHelper
}

/**
 * 测试相机的基本行为
 */

const scene = new Anove3DScene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Anov3DMesh(geometry, material)

const geometry2 = new BoxGeometry(2, 2, 2)
const materia2 = new MeshBasicMaterial({ color: '#ccc' })
const box2 = new Anov3DMesh(geometry2, materia2)

const axesHelper = createAxesHelper(10)
const gridHelper = createGridHelper(100, 30)

box.position.set(-50, 0, 0)
box2.position.set(50, 0, -50)

scene.add(box)
scene.add(box2)
scene.add(axesHelper)
scene.add(gridHelper)

utils.moveTo(box, box2, 10, 10000)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
