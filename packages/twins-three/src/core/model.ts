import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ModelType } from '../commonEnu'

class TwinsThreeModel {
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
}

export default TwinsThreeModel