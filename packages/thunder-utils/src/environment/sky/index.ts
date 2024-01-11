import { DirectionalLight, Group, MathUtils, Vector3, lib, use } from 'thunder-3d'
import { getLastValue } from '../../utils'
import { getSunPosition } from '../sun'

const Sky = lib.Sky

type SkySystemOption = {
  scalarCoefficient?: number
  turbidity?: number
  rayleigh?: number
  mieCoefficient?: number
  mieDirectionalG?: number
  elevation?: number
  azimuth?: number
  exposure?: number
}

/**
 * 天空盒 shader
 */
const initsSkySystem = (options?: SkySystemOption) => {
  const sky = new Sky()
  const position = new Vector3()
  const { renderer } = use.useScene()

  sky.scale.setScalar(450000)

  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: renderer!.toneMappingExposure,
  }
  // @ts-ignore
  const uniforms = sky.material.uniforms
  uniforms.turbidity.value = effectController.turbidity
  uniforms.rayleigh.value = effectController.rayleigh
  uniforms.mieCoefficient.value = effectController.mieCoefficient
  uniforms.mieDirectionalG.value = effectController.mieDirectionalG

  const phi = MathUtils.degToRad(90 - effectController.elevation)
  const theta = MathUtils.degToRad(effectController.azimuth)

  position.setFromSphericalCoords(1, phi, theta)
  uniforms.sunPosition.value.copy(position)

  return [sky, position, uniforms] as [typeof sky, typeof position, typeof uniforms]
}

type SunLightOption = {
  color?: string
  intensity?: number
  bias?: number
  mapSize?: [number, number]

  near?: number
  far?: number
  left?: number
  right?: number
  top?: number
  bottom?: number
}

/**
 * create sun light
 * @param options
 * @returns
 */
const initSunLight = (options?: SunLightOption) => {
  const opts = options || {}

  const sunLight = new DirectionalLight(getLastValue(opts.color, 'white'), getLastValue(opts.intensity, 1))
  sunLight.castShadow = true

  sunLight.shadow.bias = getLastValue(opts.bias, -0.005)
  sunLight.shadow.mapSize.set(getLastValue(opts.mapSize?.[0], 1024 * 2), getLastValue(opts.mapSize?.[1], 1024 * 2))

  const cam = sunLight.shadow.camera
  cam.near = getLastValue(opts.near, 1)
  cam.far = getLastValue(opts.far, 50)
  cam.left = getLastValue(opts.left, -100)
  cam.right = getLastValue(opts.right, 100)
  cam.top = getLastValue(opts.top, 100)
  cam.bottom = getLastValue(opts.bottom, -100)

  return sunLight
}

/**
 * create sky system
 * @param date
 * @param latitude
 * @param longitude
 * @returns
 */
const createSkySystem = (date: Date, latitude: number, longitude: number, sunRadius = 300) => {
  const { renderer, scene } = use.useScene()

  if (!renderer && !scene)
    throw new Error('renderer or scene is not exist')

  const [sky, position, uniforms] = initsSkySystem()
  const sunLight = initSunLight()
  const skyGroup = new Group() as (Group & { sunPosition: Vector3 })

  scene!.add(sky)
  skyGroup.add(sunLight)
  scene!.add(skyGroup)

  const move = (altitude: number, azimuth: number) => {
    position.setFromSphericalCoords(sunRadius, MathUtils.degToRad(90 - MathUtils.radToDeg(altitude)), azimuth)
    uniforms.sunPosition.value.copy(position)

    const x = sunRadius * (Math.cos(altitude)) * (Math.cos(azimuth))
    const z = sunRadius * (Math.cos(altitude)) * (Math.sin(azimuth))
    const y = sunRadius * (Math.sin(altitude))

    const sunPosition = new Vector3(x, y, z)
    skyGroup.sunPosition = sunPosition
    skyGroup.position.copy(position)

    return sunPosition
  }

  const { altitude, azimuth } = getSunPosition(date, latitude, longitude)
  move(altitude, azimuth)

  /**
   * set date
   * @param currentDate
   * @returns
   */
  const setDate = (currentDate?: Date) => {
    const { altitude, azimuth } = getSunPosition(currentDate || date, latitude, longitude)
    return move(altitude, azimuth)
  }

  return [setDate, skyGroup] as [typeof setDate, Group & { sunPosition: Vector3 }]
}

export default createSkySystem
