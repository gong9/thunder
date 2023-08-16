import type { Intersection } from 'three'
import type Mesh from './core/mesh'

export type CubeEventType = 'click' | 'pointerup' | 'pointerdown' | 'pointermove' | 'pointerleave'

export type EventHandleFn<T> = (event: Mesh, intersect?: Intersection) => void