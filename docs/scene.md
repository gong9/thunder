<script setup>
    import SceneInit from './code/Scene-init.vue'
    import SceneEvents from './code/Scene-Events.vue'
    import SceneCssRenderer from './code/Scene-CssRenderer.vue'
    import SceneCutout from './code/Scene-Cutout.vue'
    import SceneSkyBox from './code/Scene-Sky.vue'

</script>

# Scene

## 场景创建

Scene是3d中最重要的元素，区别于threejs在这里我们做了一些预处理。比如渲染器、帧循环、默认相机等等。


所以你可以根据以下步骤，简单快速的创建一个3d场景

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

<SceneInit/>

## 天空盒

```ts
const scene = new Scene({
            orbitControls: true,
            background: {
                imgs: [
                    './files/imgs/posx.jpg',
                    './files/imgs/negx.jpg',
                    './files/imgs/posy.jpg',
                    './files/imgs/negy.jpg',
                    './files/imgs/posz.jpg',
                    './files/imgs/negz.jpg'
                ]
            }
      })
```
<SceneSkyBox/>

## 事件交互

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

## cssRenderer

在anov3d中，为进一步简化cssRenderer的使用。我们不用再去手动创建渲染器、以及需要要做一些额外的与场景的关联工作。


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


## 渲染器剪裁

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

## 多场景

> 开发中

## API

#### 构造函数参数一览

```ts
interface SceneOptions {
  /** 渲染器配置 */
  rendererOps?: {
    antialias?: boolean
    logarithmicDepthBuffer?: boolean
    alpha?: boolean
    shadowMap?: boolean
    toneMapping?: ToneMapping
    toneMappingExposure?: number
    size?: {
      width: number
      height: number
      updateStyle?: boolean
    }
  }

  /** 默认相机配置 */
  defCameraOps?: {
    position?: Vector3
    fov?: number
    aspect?: number
    near?: number
    far?: number
  }

  /** 默认环境光配置 */
  defAmbientLightOps?: {
    position?: Vector3
    color?: Color
    intensity?: number
  }

  /** 默认射线检测配置 */
  defRaycasterOps?: {
    recursive?: boolean
  }

  /** 是否需要轨道控制器 */
  orbitControls?: boolean

  /** 是否需要默认环境光 */
  ambientLight?: boolean

  /** 是否按需渲染 */
  onDemand?: boolean

  /** 是否开启css2d渲染 */
  css2DRenderer?: boolean

  /** 是否开启css3d渲染 */
  css3DRenderer?: boolean

  /** 是否开启裁剪 */
  cutout?: boolean

  /** 场景背景 */
  background?: {
    imgs?: Tuple<string>
    color?: Color
    panorama?: string
  }

}
```

可访问的实例属性

```ts
  {
  /** 场景控件 */
  scene: TScene | null = null
  raycaster: Raycaster | null = null
  ambientLight: AmbientLight | null = null
  camera: PerspectiveCamera | null = null

  /** 渲染器 */
  renderer: WebGLRenderer | null = null
  cssRenderer: Cssrenderer | null = null

  /** 控制器 */
  controls: OrbitControls | null = null

  /** canvas dom */
  domElement: HTMLElement | null = null

  /** 裁剪相关 */
  cutoutCamera: PerspectiveCamera | null = null
  cutoutArea: CutoutAreaType = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
}
```

#### 场景实例的核心API

| API | 参数 | 说明 |
| --- | --- | --- |
| render | dom | 渲染3d场景 |
| startFrameAnimate | ()=>void | 执行帧循环 |