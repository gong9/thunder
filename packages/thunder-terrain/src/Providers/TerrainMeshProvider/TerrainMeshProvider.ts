import type { BufferGeometry, Mesh, Texture } from 'thunder-3d'
import { Box3Helper, MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'thunder-3d'
import type { Provider } from '../Provider'
import { TerrainMesh } from './TerrainMesh'

type TerrainMeshProviderOption = {
  geometryProvider: Provider<BufferGeometry>
  materialProvider: Provider<Texture>

  showBoundingBox?: boolean
  wireframe?: boolean
  flatShading?: boolean
  maxZoom?: number
  offset?: Vector3
}

class TerrainMeshProvider implements Provider<Mesh> {
  geometryProvider: Provider<BufferGeometry>
  textureProvider: Provider<Texture>

  maxZoom = 15
  showBoundingBox = false
  wireframe = false
  flatShading = false
  useStandardMaterial = false
  offset: Vector3 = new Vector3()

  constructor(option: TerrainMeshProviderOption) {
    const { geometryProvider, materialProvider, offset = new Vector3(), showBoundingBox = false, wireframe = false, flatShading = false, maxZoom = 15 } = option

    this.geometryProvider = geometryProvider
    this.textureProvider = materialProvider
    this.showBoundingBox = showBoundingBox
    this.wireframe = wireframe
    this.flatShading = flatShading
    this.maxZoom = maxZoom
    this.offset = offset
  }

  async getTile(tileNo: number[]): Promise<Mesh> {
    const tasks = [
      this.geometryProvider.getTile(tileNo),
      this.textureProvider.getTile(tileNo),
    ]

    const [geometry, texture] = (await Promise.all(tasks)) as [BufferGeometry, Texture]

    const { wireframe, flatShading } = this

    const material = this.useStandardMaterial
      ? new MeshStandardMaterial({ map: texture, wireframe, flatShading })
      : new MeshBasicMaterial({ map: texture, wireframe })

    const mesh = new TerrainMesh()

    geometry.computeBoundingBox()
    geometry.boundingBox!.getCenter(mesh.center)
    geometry.center()
    geometry.computeBoundingSphere()

    mesh.position.copy(mesh.center)

    mesh.geometry = geometry
    mesh.material = material

    mesh.position.add(this.offset)

    if (this.showBoundingBox) {
      const boxHelper = new Box3Helper(geometry.boundingBox!)
      mesh.add(boxHelper)
    }

    return mesh
  }

  abort(tileNo: number[]): void {
    this.geometryProvider.abort(tileNo)
    this.textureProvider.abort(tileNo)
  }

  dispose(tileNo: number[], target: Mesh): void {
    const geometry = target.geometry as BufferGeometry | undefined
    const material = target.material as MeshBasicMaterial | undefined
    if (geometry)
      this.geometryProvider.dispose(tileNo, geometry)

    if (material && material.map)
      this.textureProvider.dispose(tileNo, material.map)

    material?.dispose()
  }
}

export { TerrainMeshProvider }
