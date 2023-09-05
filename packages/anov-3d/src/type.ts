import type { Intersection, Object3D } from 'three'

export type CubeEventType = 'click' | 'pointerup' | 'pointerdown' | 'pointermove' | 'pointerleave'

export type EventHandleFn = (event: Object3D, intersect?: Intersection) => void