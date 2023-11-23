import type { Camera, Line, Mesh, Object3D, Points, Scene, Sprite, Vector2 } from 'three'
import type { TransformControls } from 'three-stdlib'
import { OutlinePass } from 'three-stdlib'

class OutlinePassExtend extends OutlinePass {
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

export default OutlinePassExtend