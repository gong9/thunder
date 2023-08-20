// @ts-nocheck
import { Mesh, Vector3, Scene, utils, ModelLoader, BoxGeometry, MeshPhongMaterial, Vector3, DoubleSide, Color, CatmullRomCurve3, LineGeometry, LineMaterial, Line2 } from '../../packages/anov-3d/src/index'

const modelLoader = new ModelLoader()

function initWall() {
    let height = 100;
    let height2 = 150;
    let arrs = [
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
        // { v1: new Vector3(10, 1, 200), v2: new Vector3(-800, 1, -180), width: 7, height: height },
        { v1: new Vector3(0, 1, 200), v2: new Vector3(0, 1, -400), width: 7, height: height },
        // { v1: new Vector3(0, 1, 0), v2: new Vector3(- 800, 1, 0), width: 7, height: height },
        { v1: new Vector3(600, 1, - 400), v2: new Vector3(600, 1, 250), width: 7, height: height },
        // { v1: new Vector3(600, 1, 400), v2: new Vector3(600, 1, 320), width: 7, height: height },

        { v1: new Vector3(300, 1, - 180), v2: new Vector3(300, 1, 400), width: 7, height: height },
        //下面是柱子
        // {
        //     v1: new Vector3(300, 1, - 180),
        //     v2: new Vector3(300, 1, - 150),
        //     width: 30,
        //     height: height2
        // },
        // {
        //     v1: new Vector3(300, 1, - 120),
        //     v2: new Vector3(300, 1, - 90),
        //     width: 30,
        //     height: height2
        // },
        // {
        //     v1: new Vector3(300, 1, - 60),
        //     v2: new Vector3(300, 1, - 30),
        //     width: 30,
        //     height: height2
        // },
        // { v1: new Vector3(300, 1, 0), v2: new Vector3(300, 1, 30), width: 30, height: height2 },
        // { v1: new Vector3(300, 1, 60), v2: new Vector3(300, 1, 90), width: 30, height: height2 },
        // { v1: new Vector3(300, 1, 120), v2: new Vector3(300, 1, 150), width: 30, height: height2 },
        // { v1: new Vector3(300, 1, 180), v2: new Vector3(300, 1, 210), width: 30, height: height2 },
        // { v1: new Vector3(300, 1, 240), v2: new Vector3(300, 1, 270), width: 30, height: height2 },
        // { v1: new Vector3(300, 1, 300), v2: new Vector3(300, 1, 330), width: 30, height: height2 },
        // { v1: new Vector3(300, 1, 360), v2: new Vector3(300, 1, 390), width: 30, height: height2 },


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

var curve
function initLine() {
    var positions = [];
    var colors = [];
    var color = new Color();
    // 通过类CatmullRomCurve3创建一个3D样条曲线
    curve = new CatmullRomCurve3([
        new Vector3(700, 1, 290),
        new Vector3(480, 1, 290),
        new Vector3(480, 1, - 290),
        new Vector3(150, 1, - 290),
        new Vector3(150, 1, 290),
        new Vector3(- 900, 1, 290),
        new Vector3(- 900, 1, - 500),
        new Vector3(700, 1, - 500),
        // new Vector3(700,0, 290)
    ], true, 'catmullrom', 0);

    // 样条曲线均匀分割2000分，返回2001个顶点坐标
    points = curve.getPoints(2000);
    for (var j = 0; j < points.length; j++) {
        color.setHSL(.01 + 0.0006 * j, 0.88, 0.715); //粉色
        // color.setHSL( .66 + 0.0003, 0.88, 0.715 ); //粉色
        colors.push(color.r, color.g, color.b);
        positions.push(points[j].x, points[j].y, points[j].z);
    }
    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    // geometry.setColors(colors);
    var matLine = new LineMaterial({
        side: DoubleSide,
        linewidth: 0.003,
        vertexColors: true,
        dashed: false,
        opacity: 1
    });
    line = new Line2(geometry, matLine);
    scene.add(line);
}

const scene = new Scene({
    orbitControls: true,
    ambientLight: true,
    defCameraOps: {
        position: new Vector3(0, 800, -300)
    }
})

initWall()
initLine()

modelLoader.loadGLTF('./car.glb')!.then((gltf) => {
    const car = (gltf as any).scene
    car.scale.set(15, 15, 15)

    const controls = utils.moveWithLine(car, curve as any, 1000)

    scene.add(car)
})

scene.render(document.querySelector('#app')!)
scene.startFrameAnimate()