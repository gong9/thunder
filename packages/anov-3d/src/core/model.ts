import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class Anov3DModelLoader {
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

    dracoLoader.setDecoderPath('./draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.preload()
    loader.setDRACOLoader(dracoLoader)

    return new Promise((resolve, reject) => {
      loader.load(url,
        (gltf) => {
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
    onLoad?: (result: GLTF) => GLTF,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {}
}

export default Anov3DModelLoader