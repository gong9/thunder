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
 * @returns
 */
export const initPostEffects = (scene: Scene, renderer: WebGLRenderer, camera: Camera) => {
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)

  storeManagement.set('composer', composer)
  composer.addPass(renderPass)

  storeManagement.set('renderPass', renderPass)

  const cleanEffectsframe = useframe(() => {
    composer.render()
  })

  return () => {
    storeManagement.delete('composer')
    storeManagement.delete('renderPass')

    cleanEffectsframe()
  }
}