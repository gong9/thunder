<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, SceneControl, TransformControls, createTransformControls } from 'thunder-3d'
import { initPostEffects, createHighSelectedTool } from 'thunder-utils'

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
  scene.render(divRef.value!)

  initPostEffects(scene.scene!, scene.renderer!, scene.camera!)
  const highSelected = createHighSelectedTool()

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  const box = new Mesh(geometry, material)

  const transformControl = createTransformControls(scene.camera!, scene.domElement!, 0.5)

  box.addNatureEventListener('pointermove', (object3D) => {
    transformControl.attach(object3D)
     highSelected([box])
  })

  box.addNatureEventListener('pointerleave', () => {
      highSelected([])
  })

  scene.add(box)  
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
