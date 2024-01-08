<script setup lang='ts'>
import { Pane } from 'tweakpane';
import { onMounted, ref } from 'vue'
import { BoxGeometry, Mesh, SceneControl, Color, Vector3, use, MeshLambertMaterial, PlaneGeometry } from 'thunder-3d'
import { createSun, } from 'thunder-utils'

const divRef = ref(null)
const guiRef = ref(null)

onMounted(() => {
    const scene = new SceneControl({
        orbitControls: true,
        defCameraOps: {
            position: new Vector3(-86.34228807025393, 4.924101067363955, -4.55659077292372)
        },
        rendererOps: {
            shadowMap: true,
            size: {
                width: 400,
                height: 400
            }
        },
        reset: true,
        ambientLight: true,
    })

    scene.render(divRef.value!)


    const PARAMS = {
        hour: 12,
    };

    const pane = new Pane({
        container: guiRef.value!
    }) as any;

    pane.addBinding(PARAMS, 'hour', {
        min: 0,
        max: 24,
        step: 1
    });


    const date = new Date()

    const [sun, updateSunPosition] = createSun(date, 40, 116, 50)

    scene.add(sun)

    const box = new BoxGeometry(5, 5, 5)
    const mater = new MeshLambertMaterial()
    const mesh = new Mesh(box, mater)
    mesh.castShadow = true

    const plane = new PlaneGeometry(100, 100)
    const planeMesh = new Mesh(plane, new MeshLambertMaterial({ color: '#ccc' }))

    planeMesh.rotateX(-Math.PI / 2)
    planeMesh.position.set(0, -2, 0)
    planeMesh.receiveShadow = true


    scene.add(planeMesh)
    scene.add(mesh)


    use.useframe(() => {

        date.setHours(PARAMS.hour)
        //@ts-ignore
        updateSunPosition(date, 40, 116)

        if ((sun as any).position.y > 0) {
            scene.scene!.background = new Color('#6FDCF7')
        } else {
            scene.scene!.background = new Color('black')
        }
    })



})
</script>

<template>
    <div ref="divRef" class="canvas" />
    <div ref="guiRef" class="gui" />
</template>

<style scoped lang='css'>
.canvas {
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.gui {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
}
</style>
