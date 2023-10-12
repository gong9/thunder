import { Color, Vector3, SceneControl as Scene, createTransformControls, createControlLine } from '../../packages/thunder-3d/src/index'


/**
 * example-13
 * line-transformControl
 */

const scene = new Scene({
  orbitControls: true,
  background: {
    imgs: [
      'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
      'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
      'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
      'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
      'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
      'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg'
    ]
  }
})

const points = [
  new Vector3(-5, 0, 0),
  new Vector3(0, 0, 0),
  new Vector3(5, 0, 0)
]

createTransformControls(0.7).then((control) => {
  const curve = createControlLine(points, control)
  scene.add(control)
  scene.add(curve.mesh)
})

scene.render(document.querySelector('#app')!)
scene.scene!.background = new Color(0xf0f0f0);
scene.startFrameAnimate()
