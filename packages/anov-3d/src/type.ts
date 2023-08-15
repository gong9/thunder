import type Mesh from './core/mesh'

export type CubeEventType = 'click' | 'pointerup' | 'pointerdown' | 'pointermove' | 'pointerleave'

export type EventHandleFn<T> = (event: Mesh) => void