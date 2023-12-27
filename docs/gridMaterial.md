<script setup>
    import GridMaterial from './code/GridMaterial.vue'
</script>


# GridMaterial

网格材质，用于模拟网格线。

<GridMaterial/>

虽然three内置了网格辅助，但是其效果性能太差，尤其是网格线过多面积过大时，远处的网格线会出现闪烁的情况「深度冲突问题」。

```ts
import { PlaneGeometry, SceneControl as Scene, Mesh, Vector3, Color, } from 'thunder-3d'
import { GridMaterial, } from 'thunder-utils'


const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(0, 10, 80)
    }
})

scene.render(document.querySelector('#app')!)

const geometry = new PlaneGeometry(10000, 10000)
const material = new GridMaterial()

const mesh = new Mesh(geometry, material)
mesh.rotateX(-Math.PI / 2)

scene.add(mesh)
```

### API

构造参数

  - name?: string   材质名称
  - side?: Side  材质渲染面
  - transparent?: boolean   是否透明
  - theme?: Color  主题色
  - majorLineWidth?: number  大网格线宽度
  - minorLineWidth?: number  小网格线宽度
  - axisLineWidth?: number   坐标轴线宽度
  - majorGridDiv?: number   大网格线间隔
  - gridDiv?: number    小网格线间隔
  - majorLineColor?: Color  大网格线颜色
  - minorLineColor?: Color    小网格线颜色
  - xAxisColor?: Color    x轴颜色
  - zAxisColor?: Color    z轴颜色