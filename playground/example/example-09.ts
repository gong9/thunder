import { Color, SceneControl as Scene, Mesh, BoxGeometry, PlaneGeometry, MeshBasicMaterial, Vector3, } from '../../packages/anov-3d/src/index'

const createPlane = () => {
    const geometry = new PlaneGeometry(100, 100);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const plane = new Mesh(geometry, material);
    return plane
}

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
})

const plane = createPlane()
plane.rotateX(-Math.PI / 2)

const createBox = (opacity?: boolean) => {
    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshBasicMaterial({ color: 'red', opacity: opacity ? 0.5 : 1, transparent: opacity ? true : false })
    return new Mesh(geometry, material)
}
const box = createBox(true)
box.visible = false

plane.addNatureEventListener('click', (object, res) => {
    const box = createBox()
    box.position.copy(res!.point)
    scene.add(box)
})

plane.addNatureEventListener('pointermove', (object, res) => {
    box.position.copy(res!.point)
    box.visible = true
})

plane.addNatureEventListener('pointerleave', () => {
    box.position.copy(new Vector3(0, 0, 0))
    box.visible = false
})

scene.add(box)
scene.add(plane)
scene.scene!.background = new Color('#345')
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
