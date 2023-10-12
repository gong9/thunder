<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, SceneControl, TransformControls, createTransformControls } from 'thunder-3d'

const divRef = ref(null)

onMounted(() => {
  const scene = new SceneControl({
    orbitControls: true,
    rendererOps:{
      size: {
        width: 400,
        height: 400
      }
    },
    defCameraOps: {
      aspect: 1
    }
  })

  let transformControl: TransformControls | null = null

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  const box = new Mesh(geometry, material)

  createTransformControls(1).then((transformControls) => {
  transformControl = transformControls
  scene.add(transformControl)
})

  box.addNatureEventListener('pointermove', (object3D) => {
   transformControl && transformControl.attach(object3D)
  })

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
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>
