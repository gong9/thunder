import { BufferGeometry, CameraHelper, Float32BufferAttribute, Group, MathUtils, MeshBasicMaterial, OrthographicCamera, PerspectiveCamera, Points, PointsMaterial, SphereGeometry, Vector3,Mesh, SceneControl as Scene } from '../../packages/thunder-3d/src/index'

let activeCamera: PerspectiveCamera | OrthographicCamera | null = null
let activeHelper: CameraHelper | null = null
const aspect = window.innerWidth / window.innerHeight
const frustumSize = 600
const scene = new Scene({
  defCameraOps: {
    position: new Vector3(0, 0, 2500),
    fov: 50,
    aspect: 0.5 * aspect,
    near: 1,
    far: 10000,
  },
})

const cameraPerspective = new PerspectiveCamera(50, 0.5 * aspect, 150, 1000)
const cameraPerspectiveHelper = new CameraHelper(cameraPerspective)
scene.add(cameraPerspectiveHelper)

const cameraOrtho = new OrthographicCamera(0.5 * frustumSize * aspect / -2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 150, 1000)
const cameraOrthoHelper = new CameraHelper(cameraOrtho)
scene.add(cameraOrthoHelper)

activeCamera = cameraPerspective
activeHelper = cameraPerspectiveHelper

cameraOrtho.rotation.y = Math.PI
cameraPerspective.rotation.y = Math.PI

const cameraRig = new Group()

cameraRig.add(cameraPerspective)
cameraRig.add(cameraOrtho)

scene.add(cameraRig)

const mesh = new Mesh(
  new SphereGeometry(100, 16, 8),
  new MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }),
)
scene.add(mesh)

const mesh2 = new Mesh(
  new SphereGeometry(50, 16, 8),
  new MeshBasicMaterial({ color: 0x00FF00, wireframe: true }),
)
mesh2.position.y = 150
mesh.add(mesh2)

const mesh3 = new Mesh(
  new SphereGeometry(5, 16, 8),
  new MeshBasicMaterial({ color: 0x0000FF, wireframe: true }),
)
mesh3.position.z = 150
cameraRig.add(mesh3)

const geometry = new BufferGeometry()
const vertices = []

for (let i = 0; i < 10000; i++) {
  vertices.push(MathUtils.randFloatSpread(2000)) // x
  vertices.push(MathUtils.randFloatSpread(2000)) // y
  vertices.push(MathUtils.randFloatSpread(2000)) // z
}

geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

const particles = new Points(geometry, new PointsMaterial({ color: 0x888888 }))
scene.add(particles)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate(
  (renderer) => {
    const r = Date.now() * 0.0005

    mesh.position.x = 700 * Math.cos(r)
    mesh.position.z = 700 * Math.sin(r)
    mesh.position.y = 700 * Math.sin(r)

    mesh.children[0].position.x = 70 * Math.cos(2 * r)
    mesh.children[0].position.z = 70 * Math.sin(r)

    if (activeCamera === cameraPerspective) {
      cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r)
      cameraPerspective.far = mesh.position.length()
      cameraPerspective.updateProjectionMatrix()

      cameraPerspectiveHelper.update()
      cameraPerspectiveHelper.visible = true

      cameraOrthoHelper.visible = false
    }
    else {
      cameraOrtho.far = mesh.position.length()
      cameraOrtho.updateProjectionMatrix()

      cameraOrthoHelper.update()
      cameraOrthoHelper.visible = true

      cameraPerspectiveHelper.visible = false
    }

    cameraRig.lookAt(mesh.position)

    renderer.clear()

    activeHelper!.visible = false

    renderer.setViewport(0, 0, window.innerWidth / 2, window.innerWidth)
    renderer.render(scene.scene!, activeCamera!)

    activeHelper!.visible = true

    renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight)
    renderer.render(scene.scene!, scene.camera!)
  },
)
