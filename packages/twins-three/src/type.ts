export type CubeEventType = 'click' | 'hover'

export type EventHandleFn<T> = (event: Event) => void