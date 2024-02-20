import { SceneControl as Scene, } from 'thunder-3d'
import { initPostEffects, createHighSelectedTool } from 'thunder-utils'



/**
 * recurrent bug
 */
const scene = new Scene({
    orbitControls: true,
    reset: true,
    ambientLight: true,
    background:{
        imgs: ['./imgs/cloud/posx.jpg', './imgs/cloud/negx.jpg', './imgs/cloud/posy.jpg', './imgs/cloud/negy.jpg', './imgs/cloud/posz.jpg', './imgs/cloud/negz.jpg']
    }
})

scene.render(document.querySelector('#app')!)


initPostEffects(scene.scene!, scene.renderer!, scene.camera!)
createHighSelectedTool({ edgeThickness: 0.01, edgeStrength: 5, visibleEdgeColor: 'red' })

