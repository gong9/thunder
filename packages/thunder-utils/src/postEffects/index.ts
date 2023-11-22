import type { Camera, Scene, WebGLRenderer } from 'thunder-3d'
import { lib, use, utils } from 'thunder-3d'

const { EffectComposer, RenderPass } = lib
const { storeManagement } = utils
const { useframe } = use

/**
 * init post effects
 * @param scene
 * @param renderer
 * @param camera
 * @param beforehooks composer render before hook
 * @param afterhooks composer render after hook
 * @returns
 */
export const initPostEffects = (scene: Scene, renderer: WebGLRenderer, camera: Camera, beforehooks?: () => void, afterhooks?: () => void) => {
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)

  storeManagement.set('composer', composer)
  composer.addPass(renderPass)

  storeManagement.set('renderPass', renderPass)

  const cleanEffectsframe = useframe(() => {
    beforehooks && beforehooks()
    composer.render()
    afterhooks && afterhooks()
  })

  return () => {
    storeManagement.delete('composer')
    storeManagement.delete('renderPass')

    cleanEffectsframe()
  }
}