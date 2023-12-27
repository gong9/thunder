<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, SceneControl, use } from 'thunder-3d'
import { ViewHelper } from 'thunder-utils'

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

  const geometry = new BoxGeometry(2, 2, 2)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  const box = new Mesh(geometry, material)

  scene.add(box)  

  const helper = new ViewHelper(scene.camera!, scene.renderer!, "top-right");

  helper.setControls(scene.controls!);

  console.log(helper);

use.useframe(()=>{
    helper.render();
})

console.log(scene.scene)
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
