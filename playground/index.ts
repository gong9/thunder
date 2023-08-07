import * as TwinsThree from '../packages/twins-three/src/index'
import { BoxGeometry, MeshBasicMaterial } from 'three'

const TwinsThreeScene = TwinsThree.default.TwinsThreeScene
const TwinsThreeMesh = TwinsThree.default.TwinsThreeMesh

const scene = new TwinsThreeScene({
    orbitControls: true,
})

const createBox = () => {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00FF00 })
    return new TwinsThreeMesh(geometry, material)
}

for (let i = 0; i < 2; i++) {
    const box = createBox()
    box.position.set(i * 4, 0, 0)
    box.addNatureEventListener('click', (event) => {
        console.log(event)
    })

    scene.add(box)
}


scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()


