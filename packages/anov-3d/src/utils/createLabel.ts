import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

export const createLabel = (dom: HTMLElement) => {
  return new CSS2DObject(dom)
}
