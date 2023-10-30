// import { ModelLoader, TransformControls, SceneControl as Scene, Group, Vector3, createTransformControls, Box3, Box3Helper, use } from 'thunder-3d'

// /**
//  * example-20
//  * group 交互
//  */

// const scene = new Scene({
//     orbitControls: true,
//     ambientLight: true
// })
// let transformControl: TransformControls | null = null
// const modelLoader = new ModelLoader()
// const group = new Group()

// createTransformControls().then((transformControls) => {
//     transformControl = transformControls
//     scene.add(transformControl)
// })

// // glb
// modelLoader.loadGLTF('./car.glb',true)!.then((object) => {
//     group.add((object as any).scene)

//     const box3 = new Box3()
//     let model: Box3 | null = null
//     let isLeaver = true
//     let iskeydown = false


//     group.addNatureEventListener('pointermove', (object3D) => {
//         // model = box3.setFromObject(group)
//         // isLeaver = false
//         transformControl && transformControl.attach(object3D)
//     })


//     // group.addNatureEventListener('pointerleave', (object3D) => {
//     //     isLeaver = true
//     // })

//     // group.addNatureEventListener('click', (object3D) => {
//     //     model = box3.setFromObject(group)

//     //     const helper = new Box3Helper(model!);
//     //     scene.add(helper);
//     // })

//     // window.addEventListener('keyup', (e) => {
//     //     iskeydown = false
//     // })

//     // window.addEventListener('keydown', (e) => {
//     //     iskeydown = true
//     // })

//     // use.useframe(() => {
//     //     let helper: Box3Helper | null = null
//     //     if (!isLeaver) {
//     //         helper = new Box3Helper(model!);

//     //         if (
//     //             !scene.scene?.children.some((item) => item instanceof Box3Helper)
//     //         ) {
//     //             scene.add(helper);
//     //         }

//     //     }
//     //     if (isLeaver && !iskeydown) {
//     //         const helper = scene.scene?.children.find((item) => item instanceof Box3Helper)
//     //         if (helper) {
//     //             scene.scene?.remove(helper)
//     //         }
//     //     }

//     // })

//     scene.add(group)
// })

// scene.render(document.querySelector('#app')!)
// 
