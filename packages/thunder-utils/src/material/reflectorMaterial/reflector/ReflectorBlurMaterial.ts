import { GLSL3, NoBlending, RawShaderMaterial, Vector2 } from 'thunder-3d'

import { fragmentShader, vertexShader } from './shader'

export class ReflectorBlurMaterial extends RawShaderMaterial {
  constructor() {
    super({
      glslVersion: GLSL3,
      uniforms: {
        tMap: { value: null },
        uDirection: { value: new Vector2(1, 0) },
        uResolution: { value: new Vector2() },
      },
      vertexShader,
      fragmentShader,
      blending: NoBlending,
      depthTest: false,
      depthWrite: false,
    })
  }
}
