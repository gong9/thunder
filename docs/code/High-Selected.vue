<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, SceneControl } from 'thunder-3d'
import { initPostEffects, createHighSelectedTool } from 'thunder-utils'

const divRef = ref(null)

onMounted(() => {
    const scene = new SceneControl({
        orbitControls: true,
        defCameraOps: {
            aspect: 1
        },
        rendererOps: {
            size: {
                width: 400,
                height: 400
            }
        },
    })

    scene.render(divRef.value!)
    scene.startFrameAnimate()

    const geometry = new BoxGeometry(5, 5, 5)
    const material = new MeshBasicMaterial({ color: 0x00FF00 })
    const box = new Mesh(geometry, material)

    scene.add(box)

    initPostEffects(scene.scene!, scene.renderer!, scene.camera!)

    const highSelected = createHighSelectedTool()

    box.addNatureEventListener('pointermove', () => {
        highSelected([box])
    })

    box.addNatureEventListener('pointerleave', () => {
        highSelected([])
    })
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
