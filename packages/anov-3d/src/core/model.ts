import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ModelType } from '../commonEnu'

class Anov3DModelLoader {
  load(type: ModelType, url: string) {
    switch (type) {
      case ModelType.GLTF:
        return this.loadGLTF(url)

      default:
        break
    }
  }

  /**
   * load gltf model
   * @param url
   * @param onLoad
   * @param onProgress
   * @param onError
   * @returns
   */
  loadGLTF(url: string,
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

  loadFbx() {}
}

export default Anov3DModelLoader