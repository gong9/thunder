import type {
  Camera,
  LineSegments,
  Material,
  OrbitControls,
  PerspectiveCamera,
  Sprite,
  WebGLRenderer,
  lib,
} from 'thunder-3d'

import {
  BackSide,
  Clock,
  Euler,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  Quaternion,
  Raycaster,
  SphereGeometry,
  Vector2,
  Vector3,
  Vector4,
  use,
} from 'thunder-3d'
import { getAxesLines, getAxesSpritePoints, getDomContainer } from './utils'

const [POS_X, POS_Y, POS_Z, NEG_X, NEG_Y, NEG_Z] = Array(6)
  .fill(0)
  .map((_, i) => i)

const clock = new Clock()
const targetPosition = new Vector3()
const targetQuaternion = new Quaternion()
const euler = new Euler()
const q1 = new Quaternion()
const q2 = new Quaternion()
const point = new Vector3()
const dim = 128
const turnRate = 2 * Math.PI
const raycaster = new Raycaster()
const mouse = new Vector2()
const mouseStart = new Vector2()
const mouseAngle = new Vector2()
const dummy = new Object3D()
let radius = 0

type GizmoOrientation = '+x' | '-x' | '+y' | '-y' | '+z' | '-z'

export type DomPlacement =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'center-right'
    | 'center-left'
    | 'center-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'

class ViewHelper extends Object3D {
  camera: OrthographicCamera | PerspectiveCamera
  orthoCamera = new OrthographicCamera(-1.8, 1.8, 1.8, -1.8, 0, 4)
  isViewHelper = true
  animating = false
  target = new Vector3()
  backgroundSphere: Mesh
  axesLines: LineSegments
  spritePoints: Sprite[]
  domElement: HTMLElement
  domContainer: HTMLElement
  domRect: DOMRect
  dragging = false
  renderer: WebGLRenderer
  controls?: OrbitControls | lib.TrackballControls
  controlsChangeEvent: { listener: () => void }
  viewport: Vector4 = new Vector4()
  offsetHeight = 0

  constructor(
    camera: PerspectiveCamera | OrthographicCamera,
    renderer: WebGLRenderer,
        placement: DomPlacement = 'bottom-right',
        size = 128,
  ) {
    super()

    this.renderer = renderer
    this.camera = camera
    this.domElement = renderer.domElement
    this.orthoCamera.position.set(0, 0, 2)

    this.backgroundSphere = getBackgroundSphere()
    this.axesLines = getAxesLines()
    this.spritePoints = getAxesSpritePoints()
    this.domContainer = getDomContainer(placement, size)

    // This may cause confusion if the parent isn't the body and doesn't have a `position:relative`
    this.domElement.parentElement!.appendChild(this.domContainer)
    this.domRect = this.domContainer.getBoundingClientRect()
    this.startListening()

    this.controlsChangeEvent = { listener: () => this.updateOrientation() }
    this.update()
    this.updateOrientation()

    this.add(this.backgroundSphere, this.axesLines, ...this.spritePoints)
  }

  startListening() {
    this.domContainer.onpointerdown = e => this.onPointerDown(e)
    this.domContainer.onpointermove = e => this.onPointerMove(e)
    this.domContainer.onpointerleave = () => this.onPointerLeave()
  }

  onPointerDown(e: PointerEvent) {
    const drag = (e: PointerEvent) => {
      if (!this.dragging && isClick(e, mouseStart))
        return
      if (!this.dragging) {
        resetSprites(this.spritePoints)
        this.dragging = true
      }

      mouseAngle
        .set(e.clientX, e.clientY)
        .sub(mouseStart)
        .multiplyScalar((1 / this.domRect.width) * Math.PI)

      this.rotation.x = clamp(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        rotationStart.x + mouseAngle.y,
        Math.PI / -2 + 0.001,
        Math.PI / 2 - 0.001,
      )
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      this.rotation.y = rotationStart.y + mouseAngle.x
      this.updateMatrixWorld()

      q1.copy(this.quaternion).invert()

      this.camera.position
        .set(0, 0, 1)
        .applyQuaternion(q1)
        .multiplyScalar(radius)
        .add(this.target)

      this.camera.rotation.setFromQuaternion(q1)

      this.updateOrientation(false)
    }
    const endDrag = () => {
      document.removeEventListener('pointermove', drag, false)
      document.removeEventListener('pointerup', endDrag, false)

      if (!this.dragging) {
        this.handleClick(e)
        return
      }

      this.dragging = false
    }

    if (this.animating === true)
      return
    e.preventDefault()

    mouseStart.set(e.clientX, e.clientY)

    const rotationStart = euler.copy(this.rotation)

    setRadius(this.camera, this.target)

    document.addEventListener('pointermove', drag, false)
    document.addEventListener('pointerup', endDrag, false)
  }

  onPointerMove(e: PointerEvent) {
    if (this.dragging)
      return;
    (this.backgroundSphere.material as Material).opacity = 0.2
    this.handleHover(e)
  }

  onPointerLeave() {
    if (this.dragging)
      return;
    (this.backgroundSphere.material as Material).opacity = 0
    resetSprites(this.spritePoints)
    this.domContainer.style.cursor = ''
  }

  handleClick(e: PointerEvent) {
    const object = getIntersectionObject(
      e,
      this.domRect,
      this.orthoCamera,
      this.spritePoints,
    )

    if (!object)
      return

    this.setOrientation(object.userData.type)
  }

  handleHover(e: PointerEvent) {
    const object = getIntersectionObject(
      e,
      this.domRect,
      this.orthoCamera,
      this.spritePoints,
    )

    resetSprites(this.spritePoints)

    if (!object) {
      this.domContainer.style.cursor = ''
    }
    else {
      object.material.map!.offset.x = 0.5
      object.scale.multiplyScalar(1.2)
      this.domContainer.style.cursor = 'pointer'
    }
  }

  setControls(controls?: OrbitControls | lib.TrackballControls) {
    if (this.controls) {
      this.controls.removeEventListener(
        'change',
        this.controlsChangeEvent.listener,
      )
      this.target = new Vector3()
    }

    if (!controls)
      return

    this.controls = controls
    controls.addEventListener('change', this.controlsChangeEvent.listener)
    this.target = controls.target
  }

  render() {
    const delta = clock.getDelta()
    if (this.animating)
      this.animate(delta)

    const { width, height } = this.domElement.getBoundingClientRect()
    const autoClear = this.renderer.autoClear

    this.renderer.autoClear = false
    this.renderer.setViewport(width - dim, height - dim, dim, dim)
    this.renderer.render(this, this.orthoCamera)
    this.renderer.setViewport(this.viewport)
    this.renderer.autoClear = autoClear
  }

  updateOrientation(fromCamera = true) {
    if (fromCamera) {
      this.quaternion.copy(this.camera.quaternion).invert()
      this.updateMatrixWorld()
    }

    updateSpritesOpacity(this.spritePoints, this.camera)
  }

  update() {
    this.domRect = this.domContainer.getBoundingClientRect()
    this.offsetHeight = this.domElement.offsetHeight
    setRadius(this.camera, this.target)
    this.renderer.getViewport(this.viewport)

    this.updateOrientation()
  }

  animate(delta: number) {
    const step = delta * turnRate

    // animate position by doing a slerp and then scaling the position on the unit sphere

    q1.rotateTowards(q2, step)
    this.camera.position
      .set(0, 0, 1)
      .applyQuaternion(q1)
      .multiplyScalar(radius)
      .add(this.target)

    // animate orientation

    this.camera.quaternion.rotateTowards(targetQuaternion, step)

    this.updateOrientation()

    if (q1.angleTo(q2) === 0)
      this.animating = false
  }

  setOrientation(orientation: GizmoOrientation) {
    prepareAnimationData(this.camera, this.target, orientation)
    this.animating = true
  }

  dispose() {
    this.axesLines.geometry.dispose();
    (this.axesLines.material as Material).dispose()

    this.backgroundSphere.geometry.dispose();
    (this.backgroundSphere.material as Material).dispose()

    this.spritePoints.forEach((sprite) => {
      sprite.material.map!.dispose()
      sprite.material.dispose()
    })

    this.domContainer.remove()

    if (this.controls) {
      this.controls.removeEventListener(
        'change',
        this.controlsChangeEvent.listener,
      )
    }
  }
}

function getBackgroundSphere() {
  const geometry = new SphereGeometry(1.6)
  const sphere = new Mesh(
    geometry,
    new MeshBasicMaterial({
      color: 0xFFFFFF,
      side: BackSide,
      transparent: true,
      opacity: 0,
      depthTest: false,
    }),
  )

  return sphere
}

function prepareAnimationData(
  camera: OrthographicCamera | PerspectiveCamera,
  focusPoint: Vector3,
  axis: GizmoOrientation,
) {
  switch (axis) {
    case '+x':
      targetPosition.set(1, 0, 0)
      targetQuaternion.setFromEuler(new Euler(0, Math.PI * 0.5, 0))
      break

    case '+y':
      targetPosition.set(0, 1, 0)
      targetQuaternion.setFromEuler(new Euler(-Math.PI * 0.5, 0, 0))
      break

    case '+z':
      targetPosition.set(0, 0, 1)
      targetQuaternion.setFromEuler(new Euler())
      break

    case '-x':
      targetPosition.set(-1, 0, 0)
      targetQuaternion.setFromEuler(new Euler(0, -Math.PI * 0.5, 0))
      break

    case '-y':
      targetPosition.set(0, -1, 0)
      targetQuaternion.setFromEuler(new Euler(Math.PI * 0.5, 0, 0))
      break

    case '-z':
      targetPosition.set(0, 0, -1)
      targetQuaternion.setFromEuler(new Euler(0, Math.PI, 0))
      break

    default:
      console.error('ViewHelper: Invalid axis.')
  }

  setRadius(camera, focusPoint)
  prepareQuaternions(camera, focusPoint)
}

function setRadius(camera: Camera, focusPoint: Vector3) {
  radius = camera.position.distanceTo(focusPoint)
}

function prepareQuaternions(camera: Camera, focusPoint: Vector3) {
  targetPosition.multiplyScalar(radius).add(focusPoint)

  dummy.position.copy(focusPoint)

  dummy.lookAt(camera.position)
  q1.copy(dummy.quaternion)

  dummy.lookAt(targetPosition)
  q2.copy(dummy.quaternion)
}

function updatePointer(
  e: PointerEvent,
  domRect: DOMRect,
  orthoCamera: OrthographicCamera,
) {
  mouse.x = ((e.clientX - domRect.left) / domRect.width) * 2 - 1
  mouse.y = -((e.clientY - domRect.top) / domRect.height) * 2 + 1

  raycaster.setFromCamera(mouse, orthoCamera)
}

function isClick(
  e: PointerEvent,
  startCoords: Vector2,
  threshold = 10,
) {
  return (
    Math.abs(e.clientX - startCoords.x) < threshold
        && Math.abs(e.clientY - startCoords.y) < threshold
  )
}

function getIntersectionObject(
  event: PointerEvent,
  domRect: DOMRect,
  orthoCamera: OrthographicCamera,
  intersectionObjects: Sprite[],
) {
  updatePointer(event, domRect, orthoCamera)

  const intersects = raycaster.intersectObjects(intersectionObjects)

  if (!intersects.length)
    return null

  const intersection = intersects[0]
  return intersection.object as Sprite
}

function resetSprites(sprites: Sprite[]) {
  let i = sprites.length

  while (i--) {
    const scale = i < 3 ? 0.6 : 0.4
    sprites[i].scale.set(scale, scale, scale)
    sprites[i].material.map!.offset.x = 1
  }
  // sprites.forEach((sprite) => (sprite.material.map!.offset.x = 1));
}

function updateSpritesOpacity(sprites: Sprite[], camera: Camera) {
  point.set(0, 0, 1)
  point.applyQuaternion(camera.quaternion)

  if (point.x >= 0) {
    sprites[POS_X].material.opacity = 1
    sprites[NEG_X].material.opacity = 0.5
  }
  else {
    sprites[POS_X].material.opacity = 0.5
    sprites[NEG_X].material.opacity = 1
  }

  if (point.y >= 0) {
    sprites[POS_Y].material.opacity = 1
    sprites[NEG_Y].material.opacity = 0.5
  }
  else {
    sprites[POS_Y].material.opacity = 0.5
    sprites[NEG_Y].material.opacity = 1
  }

  if (point.z >= 0) {
    sprites[POS_Z].material.opacity = 1
    sprites[NEG_Z].material.opacity = 0.5
  }
  else {
    sprites[POS_Z].material.opacity = 0.5
    sprites[NEG_Z].material.opacity = 1
  }
}

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export default ViewHelper
