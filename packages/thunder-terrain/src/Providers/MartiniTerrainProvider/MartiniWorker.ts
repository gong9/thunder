import { expose } from 'comlink'
import { MartiniTileUtil } from './MartiniTileUtil'

export async function getGeometryData(args: any) {
  const { id, tileNo, maxZ, url, coordType, utmZone, abort, dispose } = args

  if (abort) {
    MartiniTileUtil.fetchingMap.get(id)?.abort()
    MartiniTileUtil.fetchingMap.delete(id)

    return { id, error: true }
  }
  if (dispose) {
    MartiniTileUtil.terrainDataMap.delete(id)
    return
  }

  try {
    const { positions, uv, triangles } = await MartiniTileUtil.getTileGeometryAttributes(tileNo, url, maxZ, coordType, utmZone)

    return { id, positions, uv, triangles }
  }
  finally {
    MartiniTileUtil.fetchingMap.delete(id)
  }
}

export const createMartiniTerrainWorker = () => expose(getGeometryData)
