<script setup>
  import Model from './code/Model.vue'
</script>
# 模型加载

anov3d 将社区中常见的模型加载器进行了统一封装

所有的模型都是用统一的模型加载器 `ModelLoader`, 不同格式的模式加载对应其实例的不同加载API。他们的参数和返回值均是一致的，接收一个模型路径，返回一个包含结果的Promise。

## GLTF

```ts
import { ModelLoader, Scene, Vector3, Group } from '@anov/3d';

const scene = new Scene({
  orbitControls: true,
  ambientLight: true,
})
const modelLoader = new ModelLoader()

modelLoader.loadGLTF('./car.glb')!.then((gltf) => {
  scene.add((gltf as any).scene)
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```

<Model type = 'gltf'/>

## FBX

```ts
import { ModelLoader, Scene, Group, Vector3 } from '@anov/3d'

const scene = new Scene({
  orbitControls: true,
  ambientLight: true,
  defCameraOps:{
    position: new Vector3(0, 100, 800)
  }
})

const modelLoader = new ModelLoader()

modelLoader.loadFbx('./beijing.fbx')!.then((object) => {
  scene.add(object as Group)
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```
<Model type = 'fbx'/>

## API