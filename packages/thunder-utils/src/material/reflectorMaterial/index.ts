import type { Fog, Texture } from 'thunder-3d'
import { Color, GLSL3, Matrix3, Matrix4, Mesh, NoBlending, PlaneGeometry, RawShaderMaterial, Vector2 } from 'thunder-3d'
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

type CreateReflectorPlaneOptions = {
  reflectivity?: number
  mirror?: number
  mixStrength?: number
  position?: [number, number, number]
  map: Texture
  fog?: Fog | undefined
  dithering?: boolean
}

/**
 * create reflector plane
 * @param width
 * @param height
 * @param options
 * @returns
 */
export const createReflectorPlane = (width: number, height: number, options: CreateReflectorPlaneOptions) => {
  const { reflectivity = 300, mirror = 0.1, mixStrength = 0.1, fog, dithering = true, map } = options || {}

  const material = new ReflectorMaterial({
    reflectivity,
    mirror,
    mixStrength,
    fog,
    dithering,
    map,
  })

  const geometry = new PlaneGeometry(width, height)
  const planeMesh = new Mesh(geometry, material)

  planeMesh.rotation.x = -Math.PI / 2
  planeMesh.add(reflector)

  planeMesh.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
    planeMesh.visible = false
    reflector.update(rendererSelf, sceneSelf, cameraSelf)
    planeMesh.visible = true
  }

  return planeMesh
}
