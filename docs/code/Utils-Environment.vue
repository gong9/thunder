<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { createSnow, createRain } from '@anov/3d-utils'
import { BoxGeometry, Mesh, MeshBasicMaterial, SceneControl, Vector3 } from '@anov/3d'

const props = defineProps({
    type: {
        type: String,
        default: 'snow'
    }
})
const divRef = ref(null)

onMounted(() => {
    const scene = new SceneControl({
        orbitControls: true,
        rendererOps: {
            size: {
                width: 400,
                height: 400
            }
        },
        defCameraOps: {
            aspect: 1,
            position: new Vector3(0, 0, -30)
        }
    })

    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshBasicMaterial({ color: 0x00FF00 })
    const box = new Mesh(geometry, material)

    const [snowStart, snowStop] = createSnow(10, 1000, {
        x: 1,
        y: 20,
    }, 1, 600)

    const [rainStart, rainStop] = createRain(2, 1000, {
        x: 1,
        y: 20,
    }, 1, 600)


    if (props.type === 'snow') {
        snowStart()
    } else {
        rainStart()
    }


    scene.add(box)

    scene.render(divRef.value!)
    scene.startFrameAnimate()
})
</script>

<template>
    <div>
        <div ref="divRef" class="canvas" />
    </div>
</template>

<style scoped lang='css'>
.canvas {
    width: 100%;
    height: 400px;
    overflow: hidden;
}
</style>
