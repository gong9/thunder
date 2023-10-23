
import { SceneControl as Scene, Vector3, Color } from 'thunder-3d'
import { createCloud } from 'thunder-utils'

const scene = new Scene({

    defCameraOps: {
        position: new Vector3(0, 0, 8000),
    },
    background:{
      color:new Color('#1e4877'),
      alpha: 0.7
    },
})

scene.render(document.querySelector('#app')!)

const cloud = createCloud()
scene.add(cloud)

let position = 0;
const start_time = Date.now();

scene.startFrameAnimate(() => {
    position = ((Date.now() - start_time) * 0.01) % 8000;
    scene.camera!.position.z = -position + 8000
})
