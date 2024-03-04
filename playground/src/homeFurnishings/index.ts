import { SceneControl } from 'thunder-3d'

const scene = new SceneControl({
  orbitControls: true,
  reset: true,
  ambientLight: true,
})

scene.render(document.querySelector('#app')!)