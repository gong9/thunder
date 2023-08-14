import type { Camera, Scene } from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export type CssRendererType = 'base' | 'normal'
class AnovCssRenderer {
  private baseCssRenderer: CSS2DRenderer = new CSS2DRenderer()
  private normalCssRenderer: CSS3DRenderer = new CSS3DRenderer()
  public cssRenderer: CSS2DRenderer | CSS3DRenderer

  constructor(type: CssRendererType) {
    this.cssRenderer = type === 'base' ? this.baseCssRenderer : this.normalCssRenderer
  }

  public getSize() {
    return this.cssRenderer.getSize()
  }

  public setSize(width: number, height: number) {
    this.cssRenderer.setSize(width, height)
  }

  public render(scene: Scene, camera: Camera) {
    this.cssRenderer.render(scene, camera)
  }
}

export default AnovCssRenderer