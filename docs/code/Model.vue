<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { ModelLoader, SceneControl, Vector3, Group } from 'thunder-3d';

const props = defineProps({
    type: {
        type: String,
        default: 'gltf'
    }
})

const divRef = ref(null)
const modelLoader = new ModelLoader()

onMounted(() => {
    const scene = new SceneControl({
        orbitControls: true,
        ambientLight: true,
        rendererOps: {
            size: {
                width: 400,
                height: 400
            },
            alpha: true
        },
        defCameraOps: {
            aspect: 1,
            position: new Vector3(0, 5, -5) 
        }
    })

    scene.render(divRef.value!)


    if (props.type === 'gltf') {
        modelLoader.loadGLTF('../model/car.glb')!.then((gltf) => {
            scene.add((gltf as any).scene)
        })
    } else {
        modelLoader.loadFbx('../model/beijing.fbx')!.then((fbx) => {
            scene.camera!.position.copy(new Vector3(0,50,-50))
            scene.add(fbx as Group)
        })
    }

 
    
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
