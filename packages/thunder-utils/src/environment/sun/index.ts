import { SphereGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'thunder-3d'
import { getPosition } from 'suncalc'

/**
 * 获取当前笛卡尔坐标
 * @param date
 * @param latitude
 * @param longitude
 */
const getThreePosition = (date: Date, latitude: number, longitude: number, distance: number) => {
  const { altitude, azimuth } = getPosition(date, latitude, longitude)

  const x = distance * (Math.cos(altitude)) * (Math.cos(azimuth))
  const z = distance * (Math.cos(altitude)) * (Math.sin(azimuth))
  const y = distance * (Math.sin(altitude))

  return new Vector3(x, y, z)
}

/**
 * create init
 * @param date
 * @param latitude
 * @param longitude
 * @param distance
 */
export const createSun = (date: Date, latitude: number, longitude: number, distance = 1000, autoUpdate = true) => {

  const position = getThreePosition(date, latitude, longitude, distance)

  const box = new SphereGeometry(1)
  const mater = new MeshBasicMaterial({ color: 'yellow' })
  const mesh = new Mesh(box, mater)

  mesh.position.set(position.x, position.y, position.z)
  mesh.lookAt(0, 0, 0)

  const updateSunPosition = (date: Date, latitude: number, longitude: number) => {
    const currentPosition = getThreePosition(date, latitude, longitude, distance)
    mesh.position.set(currentPosition.x, currentPosition.y, currentPosition.z)
  }

  return [mesh, updateSunPosition]
}
