<script setup>
    import HighSelected from './code/High-Selected.vue'
    import ControlSelected from './code/Control-selected.vue'
</script>

# 边缘线高亮

<HighSelected/>

```ts
import { initPostEffects, createHighSelectedTool } from 'thunder-utils'

initPostEffects(scene.scene!, scene.renderer!, scene.camera!)
const highSelected = createHighSelectedTool()

box.addNatureEventListener('pointermove', () => {
        highSelected([box])
    })
box.addNatureEventListener('pointerleave', () => {
        highSelected([])
})
```

主要两个API

- initPostEffects 初始化后处理
- createHighSelectedTool 创建高亮工具

extends: threejs 原outlinePass与transformControls一起使用会造成transformControls的辅助线高亮，这里已经做了修正

<ControlSelected/>


