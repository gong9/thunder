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
import { Anov3DMesh, Anove3DScene  } from '@anov/3d'
import { BoxGeometry, MeshBasicMaterial } from 'three'

const scene = new Anove3DScene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Anov3DMesh(geometry, material)

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
import { Anov3DMesh, Anove3DScene, utils } from '@anov/3d'
import { AxesHelper, BoxGeometry, GridHelper, MeshBasicMaterial } from 'three'

const scene = new Anove3DScene({
  orbitControls: true,
})

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Anov3DMesh(geometry, material)

const geometry2 = new BoxGeometry(2, 2, 2)
const materia2 = new MeshBasicMaterial({ color: '#ccc' })
const box2 = new Anov3DMesh(geometry2, materia2)

box.position.set(0, 0, 0)
box2.position.set(10, 30, -30)

scene.add(box)
scene.add(box2)

utils.moveWithRound(box2, 0.2, 100000)

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()
```
