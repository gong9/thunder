import type { lib } from 'thunder-3d'
import { Layers, use, utils } from 'thunder-3d'
import { BlendFunction, EffectPass, KernelSize, SelectiveBloomEffect } from 'postprocessing'

const { storeManagement } = utils
const { useScene } = use

/**
 * create bloom selected
 */
const createBloomSelected = () => {
  const { scene, camera } = useScene()
  const composer = storeManagement.get('composer') as lib.EffectComposer | undefined

  if (!scene || !camera)
    throw new Error('scene or camera is not defined,')

  if (!composer)
    throw new Error('composer is not defined, please initPostEffects first')

  const bloomLayer = new Layers()
  bloomLayer.set(1)

  const bloomEffect = new SelectiveBloomEffect(scene, camera, {
    blendFunction: BlendFunction.COLOR_DODGE,
    kernelSize: KernelSize.SMALL,
    luminanceThreshold: 0.9,
    luminanceSmoothing: 0.0,
    height: 480,
  })
  bloomEffect.inverted = true

  const effectPass = new EffectPass(camera, bloomEffect)
  composer.addPass(effectPass as any)

  return () => {

  }
}

export default createBloomSelected