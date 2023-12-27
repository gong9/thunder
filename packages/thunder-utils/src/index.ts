import { SceneControl } from 'thunder-3d'
import { mouseDraweLine } from './core/mouseDrawe'
import { createSnow } from './environment/snow'
import { createRain } from './environment/rain'
import createCloud from './environment/cloud'
import { initPostEffects } from './postEffects'
import createHighSelectedTool from './postEffects/outlinePass'
import GridMaterial from './material/pristineGridMaterial'

export {
  SceneControl, // todo remove
  mouseDraweLine,
  createRain,
  createSnow,
  createCloud,

  initPostEffects, // effect
  createHighSelectedTool,
  GridMaterial,
}
