import { BufferAttribute, BufferGeometry, CanvasTexture, Color, LineBasicMaterial, LineSegments, RepeatWrapping, Sprite, SpriteMaterial } from 'thunder-3d'
import type { DomPlacement } from './index'

const axesColors = [
  new Color(0xFF3653),
  new Color(0x8ADB00),
  new Color(0x2C8FFF),
]

export const getDomContainer = (placement: DomPlacement, size: number) => {
  const div = document.createElement('div')
  const style = div.style

  style.height = `${size}px`
  style.width = `${size}px`
  style.borderRadius = '100%'
  style.position = 'absolute'

  const [y, x] = placement.split('-')

  style.transform = ''
  style.left = x === 'left' ? '0' : x === 'center' ? '50%' : ''
  style.right = x === 'right' ? '0' : ''
  style.transform += x === 'center' ? 'translateX(-50%)' : ''
  style.top = y === 'top' ? '0' : y === 'bottom' ? '' : '50%'
  style.bottom = y === 'bottom' ? '0' : ''
  style.transform += y === 'center' ? 'translateY(-50%)' : ''

  return div
}

export const getAxesLines = () => {
  const distance = 0.9
  const position = Array(3)
    .fill(0)
    .map((_, i) => [
      !i ? distance : 0,
      i === 1 ? distance : 0,
      i === 2 ? distance : 0,
      0,
      0,
      0,
    ])
    .flat()
  const color = Array(6)
    .fill(0)
    .map((_, i) =>
      i < 2
        ? axesColors[0].toArray()
        : i < 4
          ? axesColors[1].toArray()
          : axesColors[2].toArray(),
    )
    .flat()

  const geometry = new BufferGeometry()
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(position), 3),
  )
  geometry.setAttribute(
    'color',
    new BufferAttribute(new Float32Array(color), 3),
  )

  return new LineSegments(
    geometry,
    new LineBasicMaterial({
      linewidth: 3,
      vertexColors: true,
    }),
  )
}

export const getSpriteMaterial = (color: Color, text: 'x' | 'y' | 'z' | null = null) => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 64

  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.beginPath()
  context.arc(32, 32, 32, 0, 2 * Math.PI)
  context.closePath()
  context.fillStyle = color.getStyle()
  context.fill()

  context.beginPath()
  context.arc(96, 32, 32, 0, 2 * Math.PI)
  context.closePath()
  context.fillStyle = '#FFF'
  context.fill()

  if (text !== null) {
    context.font = 'bold 48px Arial'
    context.textAlign = 'center'
    context.fillStyle = '#000'
    context.fillText(text.toUpperCase(), 32, 48)
    context.fillText(text.toUpperCase(), 96, 48)
  }

  const texture = new CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.x = 0.5

  return new SpriteMaterial({
    map: texture,
    toneMapped: false,
    transparent: true,
  })
}

export const getAxesSpritePoints = () => {
  const axes = ['x', 'y', 'z'] as const
  return Array(6)
    .fill(0)
    .map((_, i) => {
      const isPositive = i < 3
      const sign = isPositive ? '+' : '-'
      const axis = axes[i % 3]
      const color = axesColors[i % 3]

      const sprite = new Sprite(
        getSpriteMaterial(color, isPositive ? axis : null),
      )
      sprite.userData.type = `${sign}${axis}`
      sprite.scale.setScalar(isPositive ? 0.6 : 0.4)
      sprite.position[axis] = isPositive ? 1.2 : -1.2
      sprite.renderOrder = 1

      return sprite
    })
}