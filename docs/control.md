<script setup>
    import SceneInit from './code/Scene-init.vue'
    import Control from './code/Control.vue'
</script>
# 控制器

## 转换控制器

转化控制器用于控制场景中的物体的旋转、平移、缩放等操作，它的使用是最频繁的，也是最常用的控制器。

```ts
import { Mesh, SceneControl, BoxGeometry, MeshBasicMaterial, createTransformControls, TransformControls } from 'thunder-3d'

const scene = new SceneControl({
  orbitControls: true,
})

let transformControl: TransformControls | null = null

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

createTransformControls().then((transformControls) => {
  transformControl = transformControls
  scene.add(transformControl)
})

box.addNatureEventListener('pointermove', (object3D) => {
  transformControl && transformControl.attach(object3D)
})

scene.add(box)
scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()

```

<Control/>

createTransformControls APi参数

```ts
size?: number  // 表示控制器的大小
```


## 轨道控制器

轨道控制仅需要在实例化场景时，打开轨道控制开关即可。

```ts
const scene = new SceneControl({
  orbitControls: true,
})
```

<!-- <SceneInit/> -->

