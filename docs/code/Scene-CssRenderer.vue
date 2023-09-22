<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, SceneControl, createLabel, dom } from '@anov/3d'

const divRef = ref(null)

onMounted(() => {
  const scene = new SceneControl({
    orbitControls: true,
    css2DRenderer: true,
    rendererOps: {
      size: {
        width: 400,
        height: 400
      }
    },
    defCameraOps: {
      aspect: 1
    }
  })

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  const box = new Mesh(geometry, material)

  const labelObject2d = createLabel(dom.createElement("div", {
    style: {
      color: 'red',
    },
    textContent: "这是一个box",
  }))

  labelObject2d.position.set(0, 3, 0)
  box.add(labelObject2d)

  scene.add(box)

  scene.render(divRef.value!)
  scene.startFrameAnimate()
})
</script>

<template>
  <div ref="divRef" class="canvas" />
</template>

<style scoped lang='css'>
.canvas {
  width: 400px;
  height: 400px;
  overflow: hidden;
  position: relative;
}
</style>
