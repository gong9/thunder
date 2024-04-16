import type { Texture } from 'thunder-3d'
import { Color, GLSL3, Matrix3, Matrix4, NoBlending, RawShaderMaterial, Vector2 } from 'thunder-3d'
import { fragmentShader } from './shader/frag'
import { vertexShader } from './shader/vert'
import Reflector from './Reflector'

export interface ReflectorMaterialConfig {
  color?: Color
  map?: Texture
  normalMap?: Texture
  normalScale?: Vector2
  reflectivity?: number
  mirror?: number
  mixStrength?: number
  fog?: {
    color: Color | number | string
    near: number
    far: number
  }
  dithering?: boolean

}

const reflector = new Reflector() as any

class ReflectorMaterial extends RawShaderMaterial {
  constructor({
        color = new Color(0x101010),
        map,
        normalMap,
        normalScale = new Vector2(1, 1),
        reflectivity = 0,
        mirror = 0,
        mixStrength = 10,
        fog,
        dithering = false,
  }: ReflectorMaterialConfig = {}) {
    const parameters = {
      glslVersion: GLSL3,
      defines: {
      },

      uniforms: {
        tMap: { value: null },
        tReflect: { value: reflector.renderTargetUniform.value },
        uMapTransform: { value: new Matrix3() },
        uMatrix: { value: map ? reflector.textureMatrixUniform.value : new Matrix4() },
        uColor: { value: color instanceof Color ? color : new Color(color) },
        uReflectivity: { value: reflectivity },
        uMirror: { value: mirror },
        uMixStrength: { value: mixStrength },
      },
      vertexShader,
      fragmentShader,
      blending: NoBlending,
    }

    if (map) {
      map.updateMatrix()

      parameters.defines = Object.assign(parameters.defines, {
        USE_MAP: '',
      })

      parameters.uniforms = Object.assign(parameters.uniforms, {
        tMap: { value: map },
        uMapTransform: { value: map.matrix },
      })
    }

    if (normalMap) {
      parameters.defines = Object.assign(parameters.defines, {
        USE_NORMALMAP: '',
      })

      parameters.uniforms = Object.assign(parameters.uniforms, {
        tNormalMap: { value: normalMap },
        uNormalScale: { value: normalScale },
      })

      if (!map) {
        normalMap.updateMatrix()

        parameters.uniforms = Object.assign(parameters.uniforms, {
          uMapTransform: { value: normalMap.matrix },
        })
      }
    }

    if (fog) {
      parameters.defines = Object.assign(parameters.defines, {
        USE_FOG: '',
      })

      parameters.uniforms = Object.assign(parameters.uniforms, {
        uFogColor: { value: fog.color },
        uFogNear: { value: fog.near },
        uFogFar: { value: fog.far },
      })
    }

    if (dithering) {
      parameters.defines = Object.assign(parameters.defines, {
        DITHERING: '',
      })
    }

    super(parameters)
  }
}

export { reflector }
export default ReflectorMaterial