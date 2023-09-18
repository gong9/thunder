import type { Color, Intersection, Object3D } from 'three'

export type CubeEventType = 'click' | 'pointerup' | 'pointerdown' | 'pointermove' | 'pointerleave'

export type EventHandleFn = (event: Object3D, intersect?: Intersection) => void

// fog type
export enum FogEnum {
  Fog = 'Fog',
  FogExp2 = 'FogExp2',
}

export type ColorRepresentation = Color | string | number