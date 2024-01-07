<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { PlaneGeometry, Mesh, Vector3, SceneControl as Scene, use } from 'thunder-3d'
import { ViewHelper, GridMaterial } from 'thunder-utils'

const divRef = ref(null)

onMounted(() => {
    const scene = new Scene({
        orbitControls: true,
        defCameraOps: {
            position: new Vector3(0, 10, 80)
        },
        reset: true,
        rendererOps: {
            size: {
                width: 400,
                height: 400
            }
        },
    })

    scene.render(divRef.value!)

    const geometry = new PlaneGeometry(10000, 10000)
    const material = new GridMaterial()
    const mesh = new Mesh(geometry, material)
    mesh.rotateX(-Math.PI / 2)

    scene.add(mesh)

    const helper = new ViewHelper(scene.camera!, scene.renderer!, "top-right");
    helper.setControls(scene.controls!);

    use.useframe(() => {
        helper.render();
    })
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
