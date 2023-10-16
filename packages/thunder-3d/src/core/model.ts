import type { Group, Mesh, Object3D } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { getAllMeshChildren } from '../utils'
import provideEventPrototype from './events'
import global from './global/global'

/**
 * inject event prototype fn
 * @param object3d
 */
const injectEventPrototype = (object3d: Object3D) => {
  const allMesh = getAllMeshChildren(object3d)
  allMesh.forEach((mesh) => {
    Object.assign(mesh, provideEventPrototype(mesh.raycast.bind(mesh), mesh as Mesh))
  })
}

class ModelLoader {
  /**
   * gltf model loader
   * @param url
   * @param openEvents
   * @param draco
   * @param onLoad
   * @param onProgress
   * @param onError
   * @returns
   */
  public loadGLTF(url: string,
    openEvents = false,
    draco = false,
    onLoad?: (result: GLTF) => GLTF,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {
    const loader = new GLTFLoader()

    if (draco) {
      // default draco file path is './draco/', now not support custom
      const dracoLoader = new DRACOLoader()

      dracoLoader.setDecoderPath('./draco/')
      dracoLoader.setDecoderConfig({ type: 'js' })
      dracoLoader.preload()

      loader.setDRACOLoader(dracoLoader)
    }

    return new Promise((resolve, reject) => {
      loader.load(url,
        (gltf) => {
          if (openEvents)
            injectEventPrototype(gltf.scene)

          onLoad ? resolve(onLoad(gltf)) : resolve(gltf)
        },
        (xhr) => {
          onProgress && onProgress(xhr)
        },
        (err) => {
          onError && onError(err)
          reject(err)
        })
    }) as Promise<GLTF>
  }

  /**
   * fbx model loader
   * @param url
   * @param openEvents 是否打开事件传播
   * @param onLoad
   * @param onProgress
   * @param onError
   */
  public loadFbx(url: string,
    openEvents = false,
    onLoad?: (result: Group) => Group,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {
    const fbxLoader = new FBXLoader()

    return new Promise((resolve, reject) => {
      fbxLoader.load(url,
        (fbx) => {
          if (openEvents)
            injectEventPrototype(fbx)

          onLoad ? resolve(onLoad(fbx)) : resolve(fbx)
        },
        (xhr) => {
          onProgress && onProgress(xhr)
        },
        (err) => {
          onError && onError(err)
          reject(err)
        })
    }) as Promise<Group>
  }

  /**
   * parse fbx buffer
   * @param buffer
   * @param path
   * @returns
   */
  public parseFbxBuffer(buffer: ArrayBuffer | string, path: string) {
    return new FBXLoader().parse(buffer, path)
  }
}

export default ModelLoader