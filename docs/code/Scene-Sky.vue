<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from '@anov/3d'

const divRef = ref(null)

onMounted(() => {
    const scene = new Scene({
        orbitControls: true,
        rendererOps: {
            size: {
                width: 400,
                height: 400
            }
        },
        defCameraOps: {
            aspect: 1
        },
        background: {
            imgs: [
                './imgs/posx.jpg',
                './imgs/negx.jpg',
                './imgs/posy.jpg',
                './imgs/negy.jpg',
                './imgs/posz.jpg',
                './imgs/negz.jpg'
            ]
        }
    })

    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshBasicMaterial({ color: 0x00FF00 })
    const box = new Mesh(geometry, material)

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
