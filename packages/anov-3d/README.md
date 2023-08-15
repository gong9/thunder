# anov-3d

> anov 3d 核心包


[示例网站 (notes: 暂时需科学上网)](https://anov-3d-ecology.vercel.app/#base_scene)
### usage

install

```bash
pnpm add @anov/3d
```

init a base scene 「wip」

```ts
import { Mesh, Scene, BoxGeometry, MeshBasicMaterial } from '@anov/3d'

const scene = new Scene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

box.addNatureEventListener('pointermove', (object3D) => {
  (object3D.material as any).color.set(0xFF0000)
})
box.addNatureEventListener('pointerleave', (object3D) => {
  (object3D.material as any).color.set('#ccc')
})

scene.add(box)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```

base object3d motion 「wip」

```ts
import { Mesh, Scene, utils, AxesHelper, BoxGeometry, GridHelper, MeshBasicMaterial } from '@anov/3d'

const scene = new Scene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)

const geometry2 = new BoxGeometry(2, 2, 2)
const materia2 = new MeshBasicMaterial({ color: '#ccc' })
const box2 = new Mesh(geometry2, materia2)

box.position.set(0, 0, 0)
box2.position.set(10, 30, -30)

scene.add(box)
scene.add(box2)

utils.moveWithRound(box2, 0.2, 100000)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```
