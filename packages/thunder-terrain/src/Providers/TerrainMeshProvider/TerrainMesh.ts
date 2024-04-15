import type { BufferGeometry } from 'thunder-3d'
import { Mesh, Vector3 } from 'thunder-3d'

class TerrainMesh extends Mesh {
  center = new Vector3()

  constructor(geometry?: BufferGeometry) {
    super(geometry)
  }
}

export { TerrainMesh }
