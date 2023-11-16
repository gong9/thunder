import type { Object3D } from 'thunder-3d'
import { TransformControls, Vector2, lib, use, utils } from 'thunder-3d'

type HighParamsType = {
  edgeStrength?: number // 边缘强度
  edgeGlow?: number // 缓缓接近
  edgeThickness?: number // 边缘厚度
  pulsePeriod?: number // 脉冲周期
  visibleEdgeColor?: string // 可见边缘颜色
}

const { storeManagement } = utils
const { OutlinePass, ShaderPass, FXAAShader } = lib
const { useScene } = use

/**
 *
 * @param highParams
 * @returns
 */
const createHighSelectedTool = (highParams?: HighParamsType) => {
  const baseHighParams = {
    edgeStrength: 10,
    edgeGlow: 1,
    edgeThickness: 3,
    visibleEdgeColor: 'red',
  }

  const lastHighParams = {
    ...baseHighParams,
    ...highParams,
  }

  const { scene, camera } = useScene()
  const composer = storeManagement.get('composer') as lib.EffectComposer | undefined

  if (!scene || !camera)
    throw new Error('scene or camera is not defined,')

  if (!composer)
    throw new Error('composer is not defined, please initPostEffects first')

  scene.children = scene.children.filter((item: Object3D) => !(item instanceof TransformControls))

  const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera)
  outlinePass.edgeStrength = lastHighParams.edgeStrength
  outlinePass.edgeGlow = lastHighParams.edgeGlow
  outlinePass.edgeThickness = lastHighParams.edgeThickness
  lastHighParams.pulsePeriod && (outlinePass.pulsePeriod = lastHighParams.pulsePeriod)
  outlinePass.visibleEdgeColor.set(lastHighParams.visibleEdgeColor)

  composer.addPass(outlinePass)

  // todo bugfix
  // const effectFXAA = new ShaderPass(FXAAShader)
  // effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
  // effectFXAA.renderToScreen = true
  // composer.addPass(effectFXAA)

  return (object3dArray: Object3D[]) => {
    outlinePass.selectedObjects = object3dArray
  }
}

export default createHighSelectedTool
