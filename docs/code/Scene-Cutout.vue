<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene, PerspectiveCamera, Vector3 } from '../../packages/anov-3d/dist'

const divRef = ref(null)

onMounted(() => {
  const scene = new Scene({
    orbitControls: true,
    cutout: true,
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

  const minCamera = new PerspectiveCamera(90, 1, 0.1, 5000)

  minCamera.position.copy(new Vector3(0, 5, 10))
  scene.cutoutCamera = minCamera
  scene.cutoutArea = { x: 0, y: 0, width: 100, height: 100 }

  scene.add(minCamera)
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
