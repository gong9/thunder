# use

## useFrame
> 作用： 处理需要在帧循环中执行的函数

## 用法

```ts
import { use } from 'thunder-3d'

const stopFn = use.useFrame(()=>{
    // do something
})

stopFn() // 移出帧循环
```

## useScene
> 作用： 获取场景中的核心控件

```ts
import { use } from 'thunder-3d'

const {
    scene,
    domElement,
    orbitControls
} = use.useScene()

// do something
```
