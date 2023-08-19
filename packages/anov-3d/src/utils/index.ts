import type { Object3D } from 'three'
import { Vector3 } from 'three'
import mitt from 'mitt'

const emitterHandle = mitt()

export const emitter = {
  on: emitterHandle.on,
  off: emitterHandle.off,
  emit: emitterHandle.emit,
  all: emitterHandle.all,
}

interface Node {
  children?: Node[]
  [k: string]: any
}

/**
 * get ancestors nodes
 * @param array
 * @param targetId
 * @param key
 * @returns
 */
export const getAncestorsNodes = <T extends Node>(array: T[], targetId: string | number, key = 'id') => {
  const ancestorsNodes: T[] = []

  const run = <U extends Node>(currentAttr: U[]) => {
    for (let i = 0; i < currentAttr.length; i++) {
      if (!currentAttr[i][key])
        throw new Error(`The key ${key} is not defined in the object`)

      if (currentAttr[i][key] && currentAttr[i][key] === targetId)
        return true

      if (currentAttr[i].children && Array.isArray(currentAttr[i].children)) {
        const endRecursiveLoop = run(currentAttr[i].children!)
        if (endRecursiveLoop) {
          ancestorsNodes.push(currentAttr[i] as any as T)
          return true
        }
        run(currentAttr[i].children!)
      }
    }
  }

  run<T>(array)

  return ancestorsNodes
}

/**
 * get object3d ancestors nodes
 * @param object3d
 * @returns
 */
export const getObject3dAncestorsNodes = (object3d: Object3D) => {
  const ancestorsNodes: Object3D[] = []

  let currentObject3d = object3d

  while (currentObject3d.parent) {
    ancestorsNodes.push(currentObject3d.parent)
    currentObject3d = currentObject3d.parent
  }

  return ancestorsNodes
}

/**
 * mousePointTo3DPoint
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