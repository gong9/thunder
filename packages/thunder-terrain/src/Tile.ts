import { getChildren } from '@mapbox/tilebelt'
import { Box3, Object3D } from 'thunder-3d'
import type { Map } from './Map'

class Tile extends Object3D {
  map: Map
  tileNo: number[]

  isDisposed = false
  isReady = false

  parentTile?: Tile
  childrenTiles: Tile[] = []
  boundingBoxWorld = new Box3()

  content?: Object3D

  constructor() {
    super()
  }

  init(tileNo: number[], map: Map, parentTile?: Tile) {
    this.tileNo = tileNo
    Object.freeze(this.tileNo)
    this.map = map
    this.parentTile = parentTile
    this.visible = false
    this.renderOrder = tileNo[2]
    this.ready()
  }

  private async ready() {
    try {
      this.content = await this.map.provider.getTile(this.tileNo)

      if (this.isDisposed)
        return

      this.add(this.content)

      this.boundingBoxWorld.setFromObject(this.content).applyMatrix4(this.matrixWorld)
      this.map.add(this)
      this.visible = true
      this.isReady = true

      if (this.parentTile) {
        const siblings = this.parentTile.childrenTiles
        let readyCount = 0
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].isReady)
            readyCount++
        }
        if (readyCount === 4)
          this.parentTile.visible = false
      }

      this.update()
    }
    catch (error) {

    }
  }

  update() {
    if (!this.isReady || this.isDisposed)
      return

    const { cameraFrustum, cameraWorldPosition } = this.map
    if (!cameraFrustum.intersectsBox(this.boundingBoxWorld)) {
      this.simplify()
      return
    }

    let distance = this.boundingBoxWorld.distanceToPoint(cameraWorldPosition)
    const z = this.tileNo[2]

    distance /= 2 ** (this.map.provider.maxZoom - z)

    if (distance < 1000)
      this.subdivide()

    if (distance > 1000)
      this.simplify()

    const sortedChildren = this.childrenTiles.sort((a, b) =>
      a.boundingBoxWorld.distanceToPoint(cameraWorldPosition) - b.boundingBoxWorld.distanceToPoint(cameraWorldPosition))
    sortedChildren.forEach(child => child.update())
  }

  subdivide() {
    const { isReady, tileNo, map, childrenTiles } = this
    const z = tileNo[2]
    if (!isReady || childrenTiles.length > 0 || z >= map.maxZoom)
      return

    const childrenTilesNo = getChildren(tileNo)
    childrenTilesNo.forEach((tileNo) => {
      const tile = new Tile()
      tile.init(tileNo, map, this)
      childrenTiles.push(tile)
    })
  }

  simplify() {
    this.childrenTiles.forEach(tile => tile.dispose())
    this.childrenTiles = []
    this.visible = true
  }

  dispose() {
    this.map.remove(this)
    this.map.provider!.abort(this.tileNo)
    this.childrenTiles.forEach(child => child.dispose())
    this.childrenTiles = []
    this.parentTile = undefined
    if (this.content) {
      this.map.provider!.dispose(this.tileNo, this.content)
      this.content = undefined
    }
    this.isDisposed = true
  }
}

export { Tile }
