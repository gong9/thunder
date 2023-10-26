import { Vector3, Vector2, Mesh, SceneControl as Scene, BoxGeometry, MeshBasicMaterial, BufferGeometryUtils } from 'thunder-3d'
import { OutlinePass, EffectComposer, RenderPass, ShaderPass, FXAAShader } from 'three-stdlib'
/**
 * example-01
 * base usage
 */

const scene = new Scene({
    orbitControls: true,
})
scene.render(document.querySelector('#app')!)

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const box = new Mesh(geometry, material)


scene.add(box)


// 创建后期处理效果组合器
const composer = new EffectComposer(scene.renderer!);

const renderPass = new RenderPass(scene.scene!, scene.camera!);
composer.addPass(renderPass)

// 创建轮廓线通道类型
const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene.scene!, scene.camera!);
outlinePass.edgeStrength = 10;
outlinePass.edgeGlow = 1; 
outlinePass.edgeThickness = 3;
outlinePass.pulsePeriod = 1;
outlinePass.visibleEdgeColor.set('red');
composer.addPass(outlinePass);

const effectFXAA = new ShaderPass(FXAAShader)
effectFXAA.uniforms['resolution'].value.set(.8 / window.innerWidth, .8 / window.innerHeight)
effectFXAA.renderToScreen = true
composer.addPass(effectFXAA)


box.addNatureEventListener('pointermove', () => {
    outlinePass.selectedObjects = [box]
})


box.addNatureEventListener('pointerleave', () => {
    outlinePass.selectedObjects = []
})

scene.startFrameAnimate(()=>{
    composer.render(); // 渲染后期处理效果
})
