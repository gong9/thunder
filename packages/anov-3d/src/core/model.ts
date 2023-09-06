import type { Group, Mesh } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { getAllMeshChildren } from '../utils'
import provideEventPrototype from './events'

class ModelLoader {
  /**
   * load gltf model
   * @param url
   * @param onLoad
   * @param onProgress
   * @param onError
   * @returns
   */
  public loadGLTF(url: string,
    onLoad?: (result: GLTF) => GLTF,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()

    // todo: 调优
    dracoLoader.setDecoderPath('./draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.preload()

    loader.setDRACOLoader(dracoLoader)

    return new Promise((resolve, reject) => {
      loader.load(url,
        (gltf) => {
          const allMesh = getAllMeshChildren(gltf.scene)
          allMesh.forEach((mesh) => {
            Object.assign(mesh, provideEventPrototype(mesh.raycast.bind(mesh), mesh as Mesh))
          })
          onLoad ? resolve(onLoad(gltf)) : resolve(gltf)
        },
        (xhr) => {
          onProgress && onProgress(xhr)
        },
        (err) => {
          onError && onError(err)
          reject(err)
        })
    })
  }

  /**
   * fbx model loader
   * @param url
   * @param onLoad
   * @param onProgress
   * @param onError
   */
  public loadFbx(url: string,
    onLoad?: (result: Group) => Group,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {
    const fbxLoader = new FBXLoader()

    return new Promise((resolve, reject) => {
      fbxLoader.load(url,
        (fbx) => {
          const allMesh = getAllMeshChildren(fbx)
          allMesh.forEach((mesh) => {
            Object.assign(mesh, provideEventPrototype(mesh.raycast.bind(mesh), mesh as Mesh))
          })
          onLoad ? resolve(onLoad(fbx)) : resolve(fbx)
        },
        (xhr) => {
          onProgress && onProgress(xhr)
        },
        (err) => {
          onError && onError(err)
          reject(err)
        })
    })
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