import { Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial } from 'thunder-3d'


/**
 * example-16
 * base usage
 */

const scene = new Scene({
  orbitControls: true,
  background:{
    imgs:[
     'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
     'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
     'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
     'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
     'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
     'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg'
    ]
  }
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)


box.addNatureEventListener('pointermove', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})

box.addNatureEventListener('pointerleave', (object3D) => {
  (object3D.material as any).color.set(0x00FF00)
})

scene.add(box)

scene.render(document.querySelector('#app')!)

