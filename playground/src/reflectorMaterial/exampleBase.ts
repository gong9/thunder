import { BoxGeometry, Color, Mesh, MeshNormalMaterial, PlaneGeometry, SceneControl, lib } from 'thunder-3d'

const { Reflector } = lib

const scene = new SceneControl({
  orbitControls: true,
  reset: true,
  ambientLight: true,
})

scene.render(document.querySelector('#app')!)

const mirrorConfig = {
  clipBias: 0.1,
  textureWidth: scene.renderer.domElement.width * window.devicePixelRatio,
  textureHeight: scene.renderer.domElement.height * window.devicePixelRatio,
  multisample: 0,
  color: new Color('red'),
}

const mirror = new Reflector(new PlaneGeometry(100, 100), mirrorConfig)

mirror.position.y = 0
mirror.rotateX(-Math.PI / 2)
scene.add(mirror)

const box = new Mesh(new BoxGeometry(1, 1, 1), new MeshNormalMaterial())
scene.add(box)

box.position.y = 3

scene.scene.background = new Color('#201919')