import { TransformControls as TTransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import type { Camera } from 'three'
import globalObjectManage from '../global'
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

const create = (size = 0.5) => {
    const transformControl = new TransformControls(globalObjectManage.camera as Camera, globalObjectManage.domElement as HTMLElement)
    transformControl.size = size
    transformControl.addEventListener('change', () => { })

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
 * 创建TransformControls
 * note: 不可使用await，否则会导致渲染器无法完成初始化
 * @returns
 */
export const createTransformControls = (size = 0.5) => {
    const promise = new Promise<TransformControls>((resolve) => {
        if (!(globalObjectManage.camera && globalObjectManage.domElement)) {
            emitter.on('after-render', () => {
                resolve(create(size))
            })
        }
        else {
            resolve(create(size))
        }
    })

    return promise
}
