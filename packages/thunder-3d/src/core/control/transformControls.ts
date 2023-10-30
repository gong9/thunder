import { TransformControls as TTransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import type { Camera } from 'three'
import globalObjectManage from '../global/global'
import { emitter } from '../../utils'

export class TransformControls extends TTransformControls {
  constructor(object: Camera, domElement?: HTMLElement) {
    super(object, domElement)
  }

  public dispose() {
    super.dispose()

    const index = globalObjectManage.transformControls.findIndex((item: TransformControls) => item === this)

    if (index > -1)
      globalObjectManage.transformControls.splice(index, 1)
  }
}

const create = (camera: Camera, domElement: HTMLElement, size: number) => {
  const transformControl = new TransformControls(globalObjectManage.camera as Camera, globalObjectManage.domElement as HTMLElement)
  transformControl.size = size

  transformControl.addEventListener('dragging-changed', (event) => {
    const controls = globalObjectManage.orbitControls
    if (controls)
      controls.enabled = !event.value
  })

  globalObjectManage.setTransformControls(transformControl)

  // maybe many controls
  globalObjectManage.scene!.add(transformControl)
  return transformControl
}

/**
 * create TransformControls
 * @returns
 */
export const createTransformControls = (camera: Camera, domElement: HTMLElement, size = 0.5) => {
  return create(camera, domElement, size)
}
