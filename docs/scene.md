# Scene

<script setup>
    import SceneInit from './code/Scene-init.vue'
    import SceneEvents from './code/Scene-Events.vue'
    import SceneCssRenderer from './code/Scene-CssRenderer.vue'
    import SceneCutout from './code/Scene-Cutout.vue'

</script>

## 场景创建


<SceneInit/>

Scene是3d中最重要的元素，区别于threejs在这里我们事先为大家做了一些预处理。比如渲染器、帧循环、默认相机等等。


所以可以根据以下步骤，简单快速的创建一个3d场景

1. 实例化场景对象
2. 创建一个几何体，并加入到场景中
3. 调用场景对象的render方法，传入一个dom元素
4. 开始帧循环


```ts
import { Mesh, Scene, BoxGeometry, MeshBasicMaterial } from '@anov/3d'

const scene = new Scene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2) const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```

## 鼠标交互

anov3d提供了一些常用的鼠标交互，比如点击移出移出等。区别于3d引擎常用的射线检测，anov3d提供了一种更加符合前端开发习惯的交互方式。

如：为上面几何体添加一个移入移出事件

```ts
box.addNatureEventListener('pointermove', (object3D) => {
  object3D.material.color.set(0xFF0000)
})

box.addNatureEventListener('pointerleave', (object3D) => {
  object3D.material.color.set(0x00FF00)
})

```
<SceneEvents/>

## 使用cssRenderer

在anov3d中，为进一步简化cssRenderer的使用。我们不用再去手动创建渲染器，还要做一些额外的与场景的关联工作。


先来看一下这里使用步骤

1. 构建场景时开启css2DRenderer
2. 创建一个object2d对象
3. 设置object2d对象的坐标加入场景即可

```ts

import { BoxGeometry, MeshBasicMaterial, Color, Mesh, Scene, dom, createLabel } from '@anov/3d'

const scene = new Scene({
  orbitControls: true,
  css2DRenderer: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

const labelObject2d = createLabel(dom.createElement("div", {
  style: {
    color: 'red',
    fontSize: '50px',
  },
  textContent: "测试",
}))

labelObject2d.position.set(0, 3, 0)
box.add(labelObject2d)

scene.add(box)
scene.scene!.background = new Color('#ccc')

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()

```
<SceneCssRenderer/>


## 使用渲染器剪裁

```ts
import { BoxGeometry, Scene, Vector3, MeshBasicMaterial, Mesh, PerspectiveCamera } from '@anov/3d'

const scene = new Scene({
    orbitControls: true,
    cutout: true,
})

const minCamera = new PerspectiveCamera(90, 1, 0.1, 5000)

minCamera.position.copy(new Vector3(0, 5, 10))
scene.cutoutCamera = minCamera
scene.cutoutArea = { x: 0, y: 0, width: 200, height: 200 }

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

scene.add(minCamera)
scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```

<SceneCutout/>