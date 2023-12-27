import * as THREE from 'thunder-3d'
import vertexShader from './shader/vertex'
import fragmentShader from './shader/fragment'

type GridMaterialParameters = {
  name?: string
  side?: THREE.Side
  transparent?: boolean
  theme?: THREE.Color
  majorLineWidth?: number
  minorLineWidth?: number
  axisLineWidth?: number
  majorGridDiv?: number
  gridDiv?: number
  majorLineColor?: THREE.Color
  minorLineColor?: THREE.Color
  xAxisColor?: THREE.Color
  zAxisColor?: THREE.Color
}

class GridMaterial extends THREE.Material {
  constructor(options?: GridMaterialParameters) {
    super()

    const { side, transparent, theme, majorLineWidth, minorLineWidth, axisLineWidth, name, majorGridDiv, gridDiv, majorLineColor, minorLineColor, xAxisColor, zAxisColor } = options || {}
    const _majorLineWidth = majorLineWidth ?? 0.04
    const _minorLineWidth = minorLineWidth ?? 0.01
    const _axisLineWidth = axisLineWidth ?? 0.15
    const _majorGridDiv = majorGridDiv ?? 10.0
    const _gridDiv = gridDiv ?? 4.0
    const _majorLineColor = majorLineColor ?? new THREE.Color()
    const _minorLineColor = minorLineColor ?? new THREE.Color()
    const _xAxisColor = xAxisColor ?? new THREE.Color(1, 0.3, 0.3)
    const _zAxisColor = zAxisColor ?? new THREE.Color(0.3, 0.3, 1)

    return new THREE.ShaderMaterial({
      side: side ?? THREE.DoubleSide,
      glslVersion: THREE.GLSL3,
      transparent: transparent ?? true,
      name: name ?? 'GridMaterial',
      vertexShader,
      fragmentShader,
      uniforms: {
        u_baseAlpha: { value: 0.5 },
        u_majorLineWidth: { value: _majorLineWidth }, // Example default value , 大网格线宽
        u_minorLineWidth: { value: _minorLineWidth }, // Example default value ，小网格线宽
        u_axisLineWidth: { value: _axisLineWidth }, // Example default value ，坐标轴线宽
        u_majorGridDiv: { value: _majorGridDiv }, // Example default value， 大网格间隔
        u_gridDiv: { value: _gridDiv }, // Example default value， 小网格间隔
        u_majorLineColor: { value: _majorLineColor }, // White color
        u_minorLineColor: { value: _minorLineColor }, // White color
        u_baseColor: { value: theme ?? new THREE.Color('#707070') }, // Black color
        u_xAxisColor: { value: _xAxisColor }, // Red color
        u_zAxisColor: { value: _zAxisColor }, // Blue color
      },
    })
  }
}

export default GridMaterial
