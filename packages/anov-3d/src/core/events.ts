import type { Intersection, Mesh, Object3D, Raycaster } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'
import { getObject3dAncestorsNodes } from '../utils'
import Group from './group'

type RaycastFnType = (raycaster: Raycaster, intersects: Intersection[]) => void
interface EventPrototype {
  natureEventMap: Map<CubeEventType, EventHandleFn[]>
  entered: boolean

  handleBubble: (object3d: Object3D | undefined) => void
  cancelAncestorsBubble: (object3d: Object3D | undefined) => void
  raycast: RaycastFnType
}

/**
 * process mesh created by the loader, eg: gltf, fbx ...
 * this mesh not support raycaster, so we need to process it
 */
const provideEventPrototype = (raycast: RaycastFnType, mesh: Mesh) => {
  const oldRaycast = raycast
  const ctx = mesh as Mesh & EventPrototype

  const eventPrototype: EventPrototype = {
    natureEventMap: new Map(),
    entered: false,
    handleBubble: (object3d: Object3D | undefined) => {
      if (object3d) {
        const ancestorObject3d = getObject3dAncestorsNodes(object3d, object3d => object3d instanceof Group) as Group[]

        for (let i = 0; i < ancestorObject3d.length; i++)
          ancestorObject3d[i].raycastGroup()
      }
    },
    cancelAncestorsBubble: (object3d: Object3D | undefined) => {
      if (object3d) {
        const ancestorObject3d = getObject3dAncestorsNodes(object3d, object3d => object3d instanceof Group) as Group[]

        for (let i = 0; i < ancestorObject3d.length; i++)
          ancestorObject3d[i].cancel()
      }
    },
    raycast: (raycaster: Raycaster, intersects: Intersection[]) => {
      oldRaycast(raycaster, intersects)

      const intersect = intersects[0]
      const object = intersect && intersect.object

      if (object && object.id === ctx.id)
        ctx.handleBubble(ctx)
      else
        ctx.cancelAncestorsBubble(ctx)
    },
  }

  return eventPrototype
}

export default provideEventPrototype