# Scene

## base


Scene是3d中最重要的元素，先来介绍一下如何使用anov/3d快速创建一个最简单的3d场景

```ts
import { Mesh, Scene, BoxGeometry, MeshBasicMaterial } from '@anov/3d'

const scene = new Scene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```