# thunder-3d

基于threejs的3d库

### usage

install

```bash
pnpm add thunder-3d
```

init a base scene 「wip」

```ts
import { Mesh, Scene, BoxGeometry, MeshBasicMaterial } from 'thunder-3d'

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
import { Mesh, Scene, utils, AxesHelper, BoxGeometry, GridHelper, MeshBasicMaterial } from 'thunder-3d'

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

## umd usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="./source/base.css" />
    </style>
</head>

<body>
    <div id="describe">基本场景，鼠标点击移入移出点击交互</div>
    <div id="my-sandbox"></div>
    <script>
        javascript: (function () {
            var script = document.createElement('script');
            script.onload = function () {
                var stats = new Stats();
                document.body.appendChild(stats.dom);
                requestAnimationFrame(function loop() {
                    stats.update();
                    requestAnimationFrame(loop)
                });
            };
            script.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
            document.head.appendChild(script);
        })()
    </script>
    // umd包 
    <script src="https://cdn.jsdelivr.net/npm/@anov/3d@0.0.1-alpha.5/lib/3d.min.js"></script>

    <script script type="module">
        const scene = new ANOV.Scene({
            orbitControls: true,
        })

        const geometry = new ANOV.BoxGeometry(2, 2, 2)
        const material = new ANOV.MeshBasicMaterial()
        const box = new ANOV.Mesh(geometry, material)

        const geometry2 = new ANOV.BoxGeometry(2, 2, 2)
        const material2 = new ANOV.MeshBasicMaterial()
        const box2 = new ANOV.Mesh(geometry2, material2)

        box.addNatureEventListener('pointermove', (object3D) => {
            object3D.material.color.set(0xFF0000)
        })
        box.addNatureEventListener('pointerleave', (object3D) => {
            object3D.material.color.set('#ccc')
        })

        box2.addNatureEventListener('click', (object3D) => {
            object3D.material.color.set(0xFF0000)
        })
        box2.addNatureEventListener('pointerleave', (object3D) => {
            object3D.material.color.set('#fff')
        })

        box2.position.set(5, 0, 0)
        scene.add(box)
        scene.add(box2)

        scene.scene.background = new ANOV.Color('#345')
        scene.render(document.querySelector('#my-sandbox'))
        scene.startFrameAnimate()
    </script>

</body>

</html>
```