// @ts-nocheck
import { Mesh, SceneControl as Scene, utils, ModelLoader, BoxGeometry, MeshPhongMaterial, Vector3, DoubleSide, Color, CatmullRomCurve3, LineGeometry, LineMaterial, Line2, PerspectiveCamera } from '../../packages/thunder-3d/src/index'

const modelLoader = new ModelLoader()

function initWall() {
    const height = 100;
    const arrs = [
        {
            v1: new Vector3(- 800, 1, - 400),
            v2: new Vector3(650, 1, - 400),
            width: 7,
            height: height
        },
        {
            v1: new Vector3(750, 1, - 400),
            v2: new Vector3(800, 1, - 400),
            width: 7,
            height: height
        },
        { v1: new Vector3(- 800, 1, 400), v2: new Vector3(800, 1, 400), width: 7, height: height },
        {
            v1: new Vector3(- 800, 1, - 400),
            v2: new Vector3(- 800, 1, 250),
            width: 7,
            height: height
        },
        {
            v1: new Vector3(- 800, 1, 320),
            v2: new Vector3(- 800, 1, 400),
            width: 7,
            height: height
        },
        { v1: new Vector3(800, 1, - 400), v2: new Vector3(800, 1, 400), width: 7, height: height },
        { v1: new Vector3(- 800, 1, 200), v2: new Vector3(0, 1, 200), width: 7, height: height },
        { v1: new Vector3(0, 1, 200), v2: new Vector3(0, 1, -400), width: 7, height: height },
        { v1: new Vector3(600, 1, - 400), v2: new Vector3(600, 1, 250), width: 7, height: height },
        { v1: new Vector3(300, 1, - 180), v2: new Vector3(300, 1, 400), width: 7, height: height },

    ];
    for (let i = 0; i < arrs.length; i++) {
        let vec1 = arrs[i].v1;
        let vec2 = arrs[i].v2;
        let width = arrs[i].width;
        let height = arrs[i].height;
        let depth = vec1.distanceTo(vec2);
        let postion = new Vector3((vec1.x + vec2.x) / 2, (vec1.y + vec2.y) / 2, (vec1.z + vec2.z) / 2);
        let rotationZ = Math.abs(Math.atan((vec2.z - vec1.z) / (vec2.x - vec1.x)) * 180 / Math.PI);
        postion.y += height / 2;
        let geometry = new BoxGeometry(width, height, depth);
        initCreateWall(geometry, postion, rotationZ);
    }
}

let material1 = new MeshPhongMaterial({
    color: 0x399bff,
    transparent: true,
    opacity: 0.15,
    side: DoubleSide
});
let material2 = new MeshPhongMaterial({ color: 0x399bff, side: DoubleSide });


function initCreateWall(geometry: any, postion: any, rotationZ: any) {
    let mats = [];
    mats.push(material1);
    mats.push(material2);
    // 0 前面 1后面 2下面 3上面  4右边 5左边
    let mesh = new Mesh(geometry, mats);
    for (let j = 0; j < geometry.groups.length; j++) {
        if (j == 2 || j == 3) {
            geometry.groups[j].materialIndex = 1;
        } else {
            geometry.groups[j].materialIndex = 0;
        }
    }
    mesh.position.copy(postion);
    mesh.rotation.y -= Math.PI / 180 * (90 - rotationZ);
    scene.add(mesh);
}

const initLine = () => {
    var positions = [];
    var colors = [];
    var color = new Color();
    const curve = new CatmullRomCurve3([
        new Vector3(700, 1, 290),
        new Vector3(480, 1, 290),
        new Vector3(480, 1, - 290),
        new Vector3(150, 1, - 290),
        new Vector3(150, 1, 290),
        new Vector3(- 900, 1, 290),
        new Vector3(- 900, 1, - 500),
        new Vector3(700, 1, - 500),
    ], true, 'catmullrom', 0);

    const points = curve.getPoints(2000);
    for (var j = 0; j < points.length; j++) {
        color.setHSL(.01 + 0.0006 * j, 0.88, 0.715); //粉色
        colors.push(color.r, color.g, color.b);
        positions.push(points[j].x, points[j].y, points[j].z);
    }
    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    var matLine = new LineMaterial({
        side: DoubleSide,
        linewidth: 0.003,
        vertexColors: true,
        dashed: false,
        opacity: 1
    });
    const line = new Line2(geometry, matLine);
    scene.add(line);
    return curve
}

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
    defCameraOps: {
        position: new Vector3(0, 800, -300)
    },
    cutout: true,
})


const minCamera = new PerspectiveCamera(90, 1, 0.1, 1000)


scene.cutoutCamera = minCamera

initWall()
const curve = initLine()

modelLoader.loadGLTF('./car.glb')!.then((gltf) => {
    const car = (gltf as any).scene
    car.scale.set(15, 15, 15)
    utils.moveWithLine(car, curve as any, 1000)
    utils.moveWithLine(minCamera, curve as any, 1000, {
        x: 30,
        y: 30,
        z: 30

    })
    scene.add(car)
})

scene.add(minCamera)
scene.render(document.querySelector('#app')!)
