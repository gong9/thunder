import { SceneControl } from 'thunder-3d'
import { mouseDraweLine } from './core/mouseDrawe'
import { createSnow } from './environment/snow'
import { createRain } from './environment/rain'
import createCloud from './environment/cloud'
import { initPostEffects } from './postEffects'
import createHighSelectedTool from './postEffects/outlinePass'
import { createSun } from './environment/sun'
import GridMaterial from './material/pristineGridMaterial'
import ViewHelper from './helper/view'
import createSkySystem from './environment/sky'
import ReflectorMaterial, { reflector } from './material/reflectorMaterial'

export {
  SceneControl, // todo remove
  mouseDraweLine,
  createRain,
  createSnow,
  createCloud,
  createSun,
  createSkySystem,

  initPostEffects, // effect
  createHighSelectedTool,

  GridMaterial,
  ReflectorMaterial,
  reflector,

  ViewHelper,
}
