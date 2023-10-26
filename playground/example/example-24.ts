import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体模型
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);


// 创建轮廓线通道类型
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 10;//边缘强度
// outlinePass.edgeGlow = 1;//缓缓接近
outlinePass.edgeThickness = 3;//边缘厚度
// outlinePass.pulsePeriod = 1; //脉冲周期
outlinePass.visibleEdgeColor.set('red');//可见边缘颜色

// 创建后期处理效果组合器
const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass)

composer.addPass(outlinePass);

const effectFXAA = new ShaderPass(FXAAShader)
effectFXAA.uniforms['resolution'].value.set(.8 / window.innerWidth, .8/ window.innerHeight)
effectFXAA.renderToScreen = true
composer.addPass(effectFXAA)

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    composer.render(); // 渲染后期处理效果
}

// 当鼠标点击时，将模型添加到选定对象列表中
document.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(mesh);
    if (intersects.length > 0) {
        outlinePass.selectedObjects = [mesh];
    } else {
        outlinePass.selectedObjects = [];
    }
});

animate();
