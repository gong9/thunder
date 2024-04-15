import { Texture } from 'thunder-3d'
import { wrap } from 'comlink'
import type { Provider } from '../Provider'
import { Fetch } from '../../Utils/Fetch'
import { getTileBitmap } from './getTileBitmap'

type MapProviderOption = {
  worker?: Worker
  showTileNo?: boolean
  mapSource?: string
}

class MapProvider implements Provider<Texture> {
  maxZoom = 12
  source = ''
  showTileNo = false
  private worker?: any

  fetching = new Map<number[], Fetch>()

  constructor(option?: MapProviderOption) {
    const {
      worker,
      showTileNo = false,
      mapSource = 'https://webst01.is.autonavi.com/appmaptile?style=6&x=[x]&y=[y]&z=[z]',
    } = option || {}

    if (worker)
      this.worker = wrap<any>(worker)

    this.showTileNo = showTileNo
    this.source = mapSource
  }

  async getTile(tileNo: number[]): Promise<Texture> {
    const url = this.getUrl(tileNo)
    const texture = new Texture()

    if (this.worker) {
      const id = this.getId(tileNo)
      const data = await this.worker({ id, tileNo, url, debug: this.showTileNo })

      texture.image = data!.bitmap as ImageBitmap
    }
    else {
      const fetch = new Fetch(url, { cache: 'force-cache' })
      this.fetching.set(tileNo, fetch)
      try {
        texture.image = await getTileBitmap(tileNo, fetch, this.showTileNo)
      }
      finally {
        this.fetching.delete(tileNo)
      }
    }

    texture.needsUpdate = true
    texture.anisotropy = 4
    return texture
  }

  async abort(tileNo: number[]) {
    if (!this.worker) {
      const fetch = this.fetching.get(tileNo)
      if (fetch)
        fetch.abort()

      this.fetching.delete(tileNo)
    }
    else {
      await this.worker({ id: this.getId(tileNo), abort: true })
    }
  }

  dispose(_tileNo: number[], target: Texture): void {
    target.dispose()
  }

  private getId(tileNo: number[]) {
    return tileNo.join('-')
  }

  private getUrl(tileNo: number[]) {
    const [x, y, z] = tileNo
    return this.source
      .replace('[x]', `${x}`)
      .replace('[y]', `${y}`)
      .replace('[z]', `${z}`)
  }
}

export { MapProvider }
