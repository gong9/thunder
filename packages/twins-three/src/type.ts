import type TwinsThreeMesh from './core/mesh'

export type CubeEventType = 'click' | 'hover'

export type EventHandleFn<T> = (event: TwinsThreeMesh) => void