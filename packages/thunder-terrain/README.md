# thunder-terrain


> 示例： https://three-gis-terrain-pwag.vercel.app/example/index.html

## Usage

```bash
pnpm add thunder-3d thunder-terrain
```

main.ts

```ts
import { SceneControl, Vector3, lib, use } from 'thunder-3d'
import { MapMaterialProvider, Terrain, TerrainGeometryProvider, TerrainMesh } from 'thunder-terrain'

// @ts-ignore
import MapWorker from './worker/mapWorker?worker'

// @ts-ignore
import MartiniWorker from './worker/martiniWorker?worker'

const { MapControls } = lib

const sceneControl = new SceneControl({
  orbitControls: {
    use: false,
  },
  defCameraOps: {
    position: new Vector3(545075.6602025257, 2946958.9453822337, 1000),
    far: 1e7 * 10,
  },
  reset: true,
  ambientLight: true,
})

sceneControl.render(document.body)

sceneControl.camera!.up = new Vector3(0, 0, 1)
sceneControl.ambientLight!.intensity = 20

const controls = new MapControls(sceneControl.camera! as any, sceneControl.renderer!.domElement)
controls!.target.set(585075.6602025257, 2946958.9453822337, 10)

const martiniProvider = new TerrainGeometryProvider({
  worker: new MartiniWorker(),
})
const mapProvider = new MapMaterialProvider({
  worker: new MapWorker(),
})

const meshProvider = new TerrainMesh({
  geometryProvider: martiniProvider,
  materialProvider: mapProvider,
})

const map = new Terrain({
  provider: meshProvider,
  camera: sceneControl.camera!,
})

sceneControl.add(map)

use.useframe(() => {
  controls.update()
  map.update()

  const far = Math.abs(sceneControl.camera!.position.z) * 50
  sceneControl.camera!.far = far + 5000
  sceneControl.camera!.updateProjectionMatrix()
})
```


mapWorker?worker.ts

```ts
import { createMapWorker } from 'thunder-terrain'

createMapWorker()
```


martiniWorker?worker

```ts
import { createMartiniTerrainWorker } from 'thunder-terrain'

createMartiniTerrainWorker()
```