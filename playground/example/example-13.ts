import { Color, Vector3, SceneControl as Scene, createControlLine } from '../../packages/thunder-3d/src/index'


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


scene.render(document.querySelector('#app')!)
scene.scene!.background = new Color(0xf0f0f0);

