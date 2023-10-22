
import { SceneControl as Scene, Vector3, Color } from 'thunder-3d'
import { createCloud } from 'thunder-utils'


const container = document.createElement('div');
container.style.height = 500 + 'px'
container.style.width = 500 + 'px'
document.body.appendChild(container);

//gradient

const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d')!;

const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#1e4877');
gradient.addColorStop(0.5, '#4584b4');

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
container.style.backgroundSize = '32px 100%';


const scene = new Scene({

    defCameraOps: {
        position: new Vector3(0, 0, 8000),
    },
    background:{
      color:new Color('#1e4877'),
      alpha: 0.7

    },
})

createCloud(scene.scene!)


scene.render(document.querySelector('#app')!)

let position = 0;
const start_time = Date.now();

scene.startFrameAnimate(() => {
    position = ((Date.now() - start_time) * 0.01) % 8000;
    scene.camera!.position.z = -position + 8000
})
