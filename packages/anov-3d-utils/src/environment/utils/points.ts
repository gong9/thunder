import { BufferGeometry, Points, PointsMaterial, TextureLoader, Vector3, globalObjectManage } from '@anov/3d'
import type { SpeedType } from '../rain'

interface EnvPointsOptions {
  range?: number
  count?: number
  opacity?: number
  url: string
  size?: number
  speed?: SpeedType
}

export type AVector3 = Vector3 & {
  speedX: number
  speedY: number
  speedZ: number
}

class EnvironmentPoints {
  private opts: EnvPointsOptions = {} as EnvPointsOptions
  private points: AVector3[] = []

  public material: PointsMaterial | null = null
  public geometry: BufferGeometry | null = null
  public point: Points | null = null

  constructor(opts: EnvPointsOptions) {
    this.opts = opts

    this.createEnvPoints()
  }

  private createEnvPoints() {
    this.material = new PointsMaterial({
      size: this.opts.size || 1,
      map: new TextureLoader().load(this.opts.url),
      transparent: true,
      opacity: this.opts.opacity,
      depthTest: false,
    })

    this.geometry = new BufferGeometry()

    const range = this.opts.range ?? 1000

    for (let i = 0; i < (this.opts.count || 500); i++) {
      const position = new Vector3(
        Math.random() * range - range / 2,
        Math.random() * range,
        Math.random() * range - range / 2,
      ) as AVector3

      position.speedX = this.opts.speed?.x || 0
      position.speedY = this.opts.speed?.x || 10
      position.speedZ = this.opts.speed?.x || 0

      this.points.push(position)
    }
    this.geometry.setFromPoints(this.points)

    this.point = new Points(this.geometry, this.material)
  }

  public animation(handlefn: (position: AVector3) => void) {
    this.points.forEach((position) => {
      handlefn(position)
    })

    this.point!.geometry.setFromPoints(this.points)
  }
}

export default EnvironmentPoints