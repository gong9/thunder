import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3, use } from 'thunder-3d'
import { getPosition } from 'suncalc'

/**
 * 获取当前笛卡尔坐标
 * @param date
 * @param latitude
 * @param longitude
 */
const getThreePosition = (date: Date, latitude: number, longitude: number, distance: number) => {
  const { altitude, azimuth } = getPosition(date, latitude, longitude)

  const x = Math.cos(altitude) * Math.sin(azimuth) * distance
  const y = Math.sin(altitude) * distance
  const z = Math.cos(altitude) * Math.cos(azimuth) * distance

  return new Vector3(x, y, z)
}

/**
 * create init
 * @param date
 * @param latitude
 * @param longitude
 * @param distance
 */
export const createSun = (date = new Date(), latitude: number, longitude: number, autoUpdate = true, distance = 1000) => {
  const position = getThreePosition(date, latitude, longitude, distance)

  const box = new BoxGeometry(100, 100, 100)
  const mater = new MeshBasicMaterial({ color: 'red' })
  const mesh = new Mesh(box, mater)

  mesh.position.copy(position)
  mesh.lookAt(0, 0, 0)

  const date1 = new Date()
  const i = 0

  // setInterval(() => {
  //   if (autoUpdate) {
  //     if (i === 23)
  //       i = 0
  //     date1.setHours(i++)
  //     const lastPosition = getThreePosition(date1, latitude, longitude, distance)

  //     console.log(date1)
  //     mesh.position.copy(lastPosition)
  //   }
  // }, 500)

  return mesh
}
