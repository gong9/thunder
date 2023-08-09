import type TwinsThreeMesh from './core/mesh'

export type CubeEventType = 'pointerup' | 'pointerdown' | 'pointermove' | 'pointerleave'

export type EventHandleFn<T> = (event: TwinsThreeMesh) => void