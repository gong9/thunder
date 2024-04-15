// @ts-nocheck
import { expose } from 'comlink'
import { Fetch } from '../../Utils/Fetch'
import { getTileBitmap } from './getTileBitmap'

const fetchingMap = new Map<string, Fetch>()

export async function getBitmap(args) {
  const { id, tileNo, url, debug, abort } = args

  // Abort fetching
  if (abort) {
    fetchingMap.get(id)?.abort()
    fetchingMap.delete(id)

    return { id, error: true }
  }

  try {
    const fetch = new Fetch(url, { cache: 'force-cache' })
    fetchingMap.set(id, fetch)
    const bitmap = await getTileBitmap(tileNo, fetch, debug)

    return { id, bitmap }
  }
  catch (e) {
    return { id, error: true }
  }
  finally {
    fetchingMap.delete(id)
  }
}

export type MapWorker = typeof getBitmap

export const createMapWorker = () => expose(getBitmap)
