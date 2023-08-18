import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import type { Camera } from 'three'
import globalObjectManage from '../global'

// class TransformControls extends TTransformControls {
//     constructor(object: Camera, domElement?: HTMLElement) {
//         super(object, domElement)
//     }

//     public init() {
//         const transformControl = new TransformControls(globalObjectManage.camera as Camera, globalObjectManage.domElement as HTMLElement)

//         // todo 按需渲染时处理
//         transformControl.addEventListener('change', () => { })
//         transformControl.addEventListener('dragging-changed', (event) => {
//             const controls = globalObjectManage.orbitControls
//             if (controls)
//                 controls.enabled = !event.value
//         })

//         return transformControl
//     }
// }

export const createTransformControls = () => {
    const transformControl = new TransformControls(globalObjectManage.camera as Camera, globalObjectManage.domElement as HTMLElement)
    // todo 按需渲染时处理
    transformControl.addEventListener('change', () => { })

    transformControl.addEventListener('dragging-changed', (event) => {
        const controls = globalObjectManage.orbitControls
        if (controls)
            controls.enabled = !event.value
    })

    globalObjectManage.setTransformControls(transformControl)
    globalObjectManage.scene!.add(transformControl)
    return transformControl
}
