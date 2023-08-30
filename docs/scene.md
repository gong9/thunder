# Scene

<script setup>
    import CodePreview from './code/CodePreview.vue'
</script>

## base


<CodePreview/>

Scene是3d中最重要的元素，区别于threejs在这里我们事先为大家做了一些预处理。比如渲染器、帧循环、默认相机等等。


所以可以根据以下步骤，很简单的创建一个3d场景

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