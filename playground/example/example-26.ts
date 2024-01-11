import {  PMREMGenerator, MeshBasicMaterial, SceneControl as Scene, Vector3, Mesh, MeshLambertMaterial, lib, PlaneGeometry, BoxGeometry } from 'thunder-3d'
import { createSkySystem } from 'thunder-utils'
import { Pane } from 'tweakpane';
import * as TWEEN from '@tweenjs/tween.js'


/**
 * 模拟太阳移动
 */
const scene = new Scene({
    orbitControls: true,
    defCameraOps: {
        position: new Vector3(-86.34228807025393, 4.924101067363955, -4.55659077292372),
        far: 1000000,
    },
    rendererOps: {
        shadowMap: true
    },
    reset: true,
    ambientLight: true
})

scene.render(document.querySelector('#app')!)

const date = new Date()
const plane = new PlaneGeometry(10000, 10000)
const planeMesh = new Mesh(plane, new MeshLambertMaterial())

planeMesh.rotateX(-Math.PI / 2)
planeMesh.position.set(0, -2, 0)
planeMesh.receiveShadow = true
scene.add(planeMesh)

const box1 = new BoxGeometry(10, 100, 10)
const mater1 = new MeshBasicMaterial({ color: '#fff' })
const box3 = new Mesh(box1, mater1)
box3.castShadow = true
scene.add(box3)

const pmremGenerator = new PMREMGenerator(scene.renderer!)
pmremGenerator.compileEquirectangularShader()
// @ts-expect-error
const roomEnvironment = new lib.RoomEnvironment()
scene.scene!.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture


const [setDate,sun] = createSkySystem(date, 40, 116)


const setDateWithHour = (time?: number) => {
    time && date.setHours(time)
    setDate(date)
}

const pane = new Pane() as any;
const PARAMS = {
    hour: date.getHours(),
};

pane.addBinding(PARAMS, 'hour', {
    min: 0,
    max: 23,
    step: 0.1,
    label: '时间',
}).on('change', (ev: any) => {
    setDateWithHour(ev.value)

});

const btn = pane.addButton({
    title: '启动',
    label: '自动时间切换',   // optional
});

btn.on('click', () => {
    const startDateTime = new Date();
    startDateTime.setHours(0, 0, 0, 0);

    const endDateTime = new Date();
    endDateTime.setHours(23, 59, 59, 999);

    // @ts-ignore
    const oneDayDuration = endDateTime - startDateTime;
    new TWEEN.Tween({ progress: 0 })
        .to({ progress: 1 }, 10000)
        .onUpdate(function ({ progress }) {

            let currentTime = new Date(startDateTime.getTime() + progress * oneDayDuration);
            setDate(currentTime)

        })
        .start()
});


setDateWithHour()



