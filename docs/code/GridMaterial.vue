<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { SceneControl as Scene, Mesh, Vector3, PlaneGeometry } from 'thunder-3d'
import { GridMaterial, } from 'thunder-utils'

const divRef = ref(null)

onMounted(() => {
const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(0, 10, 10)
    }
})

  scene.render(divRef.value!)

const geometry = new PlaneGeometry(10000, 10000)
const material = new GridMaterial()

const mesh = new Mesh(geometry, material)
mesh.rotateX(-Math.PI / 2)

scene.add(mesh)  
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
