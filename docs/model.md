<script setup>
  import Model from './code/Model.vue'
</script>
# 模型加载

anov3d 将社区中常见的模型加载器进行了统一封装

所有的模型都是用统一的模型加载器 `ModelLoader`, 不同格式的模式加载对应其实例的不同加载API。他们的参数和返回值均是一致的，接收一个模型路径，返回一个包含结果的Promise。

## GLTF

```ts
import { ModelLoader, SceneControl, Vector3, Group } from 'thunder-3d';

const scene = new SceneControl({
  orbitControls: true,
  ambientLight: true,
})

scene.render(document.querySelector('#app')!)

const modelLoader = new ModelLoader()

modelLoader.loadGLTF('./car.glb')!.then((gltf) => {
  scene.add((gltf as any).scene)
})

```

<Model type = 'gltf'/>

## FBX

```ts
import { ModelLoader, SceneControl, Group, Vector3 } from 'thunder-3d'

const scene = new SceneControl({
  orbitControls: true,
  ambientLight: true,
  defCameraOps:{
    position: new Vector3(0, 100, 800)
  }
})

scene.render(document.querySelector('#app')!)

const modelLoader = new ModelLoader()

modelLoader.loadFbx('./beijing.fbx')!.then((object) => {
  scene.add(object as Group)
})
```
<Model type = 'fbx'/>

## 关于模型的鼠标事件交互

目前对模型的鼠标交互操作只支持`loadFbx`、`loadGLTF`,这两个核心加载api, 并且由于性能考虑不会默认打开，需要手动开启。他的使用方式也需要在顶层包裹一层Group, 在Group进行事件监听。 暂时不增加对模型内部的子模型的事件监听


```ts
import { ModelLoader, SceneControl as Scene, Group, Vector3} from 'thunder-3d'

modelLoader.loadGLTF('./car.glb',true)!.then((object) => {
  group.add(object.scene)
  group.addNatureEventListener('click', (object3D) => {
       // do something
    })
  scene.add(group)
})

```

## API