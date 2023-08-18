import { Color, Scene, AxesHelper, GridHelper, PlaneGeometry, ShadowMaterial, Mesh } from '../../packages/anov-3d/src/index'

const createAxesHelper = (size = 1) => {
    const axesHelper = new AxesHelper(size)

    return axesHelper
}

const createGridHelper = (size = 10, divisions = 10) => {
    const gridHelper = new GridHelper(size, divisions)

    return gridHelper
}

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
})

const axesHelper = createAxesHelper(10)
const gridHelper = createGridHelper(100, 30)

scene.add(axesHelper)
scene.add(gridHelper)

scene.scene!.background = new Color('#345')
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
