
import { lib, PointLight, SceneControl as Scene, BoxGeometry, MeshBasicMaterial, MeshPhongMaterial, PlaneGeometry, Mesh, Vector3 } from 'thunder-3d';


/**
 * 镜面
 * base usage
 */

const scene = new Scene({
    orbitControls: true,
    rendererOps:{
        antialias:true
    }
})
scene.render(document.querySelector('#app')!)


const planeGeometry = new PlaneGeometry(100,100)
const reflector = new lib.Reflector(planeGeometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0xcccccc,
})
reflector.position.y = 50;
reflector.position.z = - 50;
scene.add(reflector);


const box = new BoxGeometry(2,2,2)
const material = new MeshBasicMaterial({color: 0x00ff00})
const mesh = new Mesh(box,material)
scene.add(mesh)

const mainLight = new PointLight(0xe7e7e7, 2.5, 250, 0);
mainLight.position.y = 60;
scene.add(mainLight);

const greenLight = new PointLight(0x00ff00, 0.5, 1000, 0);
greenLight.position.set(550, 50, 0);
scene.add(greenLight);

const redLight = new PointLight(0xff0000, 0.5, 1000, 0);
redLight.position.set(- 550, 50, 0);
scene.add(redLight);

const blueLight = new PointLight(0xbbbbfe, 0.5, 1000, 0);
blueLight.position.set(0, 50, 550);
scene.add(blueLight);

const planeGeo = new PlaneGeometry(100.1, 100.1);
const planeTop = new Mesh(planeGeo, new MeshPhongMaterial({ color: 0xffffff }));
planeTop.position.y = 100;
planeTop.rotateX(Math.PI / 2);
scene.add(planeTop);

const planeBottom = new Mesh(planeGeo, new MeshPhongMaterial({ color: 0xffffff }));
planeBottom.rotateX(- Math.PI / 2);
scene.add(planeBottom);

const planeFront = new Mesh(planeGeo, new MeshPhongMaterial({ color: 0x7f7fff }));
planeFront.position.z = 50;
planeFront.position.y = 50;
planeFront.rotateY(Math.PI);
scene.add(planeFront);

const planeRight = new Mesh(planeGeo, new  MeshPhongMaterial({ color: 0x00ff00 }));
planeRight.position.x = 50;
planeRight.position.y = 50;
planeRight.rotateY(- Math.PI / 2);
scene.add(planeRight);

const planeLeft = new Mesh(planeGeo, new MeshPhongMaterial({ color: 0xff0000 }));
planeLeft.position.x = - 50;
planeLeft.position.y = 50;
planeLeft.rotateY(Math.PI / 2);
scene.add(planeLeft);