import type { Camera, Line, Mesh, Object3D, Points, Scene, Sprite, Vector2 } from 'three'
import type { TransformControls } from 'three-stdlib'
import { OutlinePass } from 'three-stdlib'

// control
export { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// loader
export { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// renderer
export { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
export { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

// line
export { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
export { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
export { Line2 } from 'three/examples/jsm/lines/Line2'

// utis
export * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

// all
export * as lib from 'three-stdlib'

export class OutlinePassExtend extends OutlinePass {
  constructor(resolution: Vector2, scene: Scene, camera: Camera, selectedObjects?: Object3D[]) {
    super(resolution, scene, camera, selectedObjects)
  }

  public changeVisibilityOfNonSelectedObjects(bVisible: boolean): void {
    // @ts-ignore
    const cache = this._visibilityCache
    const selectedMeshes: Object3D[] = []

    function gatherSelectedMeshesCallBack(object: Object3D): void {
      if ((object as Mesh).isMesh)
        selectedMeshes.push(object)
    }

    for (let i = 0; i < this.selectedObjects.length; i++) {
      const selectedObject = this.selectedObjects[i]
      selectedObject.traverse(gatherSelectedMeshesCallBack)
    }

    function VisibilityChangeCallBack(object: Object3D): void {
      if ((object as Mesh).isMesh || (object as Line).isLine || (object as Sprite).isSprite || (object as TransformControls).isTransformControls) {
        // only meshes and sprites are supported by OutlinePass

        let bFound = false

        for (let i = 0; i < selectedMeshes.length; i++) {
          const selectedObjectId = selectedMeshes[i].id

          if (selectedObjectId === object.id) {
            bFound = true
            break
          }
        }

        if (bFound === false) {
          const visibility = object.visible

          if (bVisible === false || cache.get(object) === true)
            object.visible = bVisible

          cache.set(object, visibility)
        }
      }
      else if ((object as Points).isPoints || (object as Line).isLine) {
        // the visibilty of points and lines is always set to false in order to
        // not affect the outline computation

        if (bVisible === true) {
          object.visible = cache.get(object) as boolean // restore
        }
        else {
          cache.set(object, object.visible)
          object.visible = bVisible
        }
      }
    }

    this.renderScene.traverse(VisibilityChangeCallBack)
  }
}