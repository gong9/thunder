import * as TwinsThree from '../packages/twins-three/src/index'
import { BoxGeometry, Mesh, MeshBasicMaterial, AmbientLight, Vector3 } from 'three'

const TwinsThreeScene = TwinsThree.default.TwinsThreeScene

const createBox = () => {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00FF00 })
    return new Mesh(geometry, material)
}

const createAmbientLight = (position: Vector3, color = 0xFFFFFF, intensity = 1) => {
    const ambientLight = new AmbientLight(color, intensity)
    ambientLight.position.set(position.x, position.y, position.z)

    return ambientLight
}

// template
const scene = new TwinsThreeScene({
    orbitControls: true,
})
const ambientLight = createAmbientLight(new Vector3(0, 0, 0))
const box = createBox()

scene.add(box)
scene.add(ambientLight)
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
