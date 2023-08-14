import { Vector3 } from 'three'
import mitt from 'mitt'

const emitterHandle = mitt()

export const emitter = {
  on: emitterHandle.on,
  off: emitterHandle.off,
  emit: emitterHandle.emit,
  all: emitterHandle.all,
}

/**
 * 鼠标点转换为3D点
 * todo: bugfix
 * @param mouseX
 * @param mouseY
 * @param camera
 * @param renderer
 * @returns
 */
export const mousePointTo3DPoint = (mouseX: number, mouseY: number, camera: THREE.Camera, renderer: THREE.WebGLRenderer) => {
  const vector = new Vector3()

  vector.set(
    (mouseX / renderer.domElement.clientWidth) * 2 - 1,
    -(mouseY / renderer.domElement.clientHeight) * 2 + 1,
    0.5,
  )
  vector.unproject(camera)
  const dir = vector.sub(camera.position).normalize()
  const distance = -camera.position.z / dir.z
  const pos = camera.position.clone().add(dir.multiplyScalar(distance))
  return pos
}