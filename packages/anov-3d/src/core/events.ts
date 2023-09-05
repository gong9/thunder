import type { Intersection, Object3D, Raycaster } from 'three'
import type { CubeEventType, EventHandleFn } from '../type'

interface EventPrototype {
  natureEventMap: Map<CubeEventType, EventHandleFn[]>
  entered: boolean

  handleBubble: (object3d: Object3D | undefined) => void
  cancelAncestorsBubble: (object3d: Object3D | undefined) => void
  raycast: (raycaster: Raycaster, intersects: Intersection[]) => void
}

/**
 * process mesh created by the loader, eg: gltf, fbx ...
 * this mesh not support raycaster, so we need to process it
 */
const eventPrototype: EventPrototype = {
  natureEventMap: new Map(),
  entered: false,
  handleBubble: (object3d: Object3D | undefined) => {},
  cancelAncestorsBubble: (object3d: Object3D | undefined) => {},
  raycast: () => {},
}

export default eventPrototype