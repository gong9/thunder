import { BoxGeometry, CameraHelper, MeshBasicMaterial, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three'
import { TwinsThreeMesh, TwinsThreeScene } from '../../packages/twins-three/src/index'

const aspect = window.innerWidth / window.innerHeight
const frustumSize = 6000
const scene = new TwinsThreeScene({
  orbitControls: true,
  defCameraOps: {
    position: new Vector3(0, 0, 2500),
    fov: 50,
    aspect: 0.5 * aspect / aspect,
    near: 1,
    far: 10000,
  },
})

const cameraPerspective = new PerspectiveCamera(50, 0.5 * aspect / aspect, 150, 1000)
const cameraPerspectiveHelper = new CameraHelper(cameraPerspective)
scene.add(cameraPerspectiveHelper)

const cameraOrtho = new OrthographicCamera(0.5 * frustumSize * aspect / -2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 150, 1000)
const cameraOrthoHelper = new CameraHelper(cameraOrtho)
scene.add(cameraOrthoHelper)

const createBox = () => {
  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  return new TwinsThreeMesh(geometry, material)
}

const box = createBox()
box.position.set(0, 0, 0)
box.addNatureEventListener('click', (event) => {
  console.log(event)
})
scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
