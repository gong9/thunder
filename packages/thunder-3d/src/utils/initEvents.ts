import { InteractionManager } from '../core/eventManager'
import globalObjectManage from '../core/global/global'
import globalControl from '../core/global/globalControl'

const createInteractionManager = () => {
  const renderer = globalObjectManage.renderer
  const camera = globalObjectManage.camera

  if (!renderer)
    throw new Error('renderer is not defined')

  if (!camera)
    throw new Error('scene is not defined')

  const interactionManager = new InteractionManager(renderer, camera, renderer.domElement)

  globalControl.add(() => {
    interactionManager.update()
  }, Infinity)

  return interactionManager
}

export default createInteractionManager