/* eslint-disable import/export */
import Scene from './core/scene'
import Mesh from './core/mesh'
import { PerspectiveCamera } from './core/camera'
import ModelLoader from './core/model'
import { ModelType } from './commonEnu'
import { createLabel } from './utils/createLabel'
import { Direction, moveLine, moveTo, moveWithLine, moveWithRound } from './utils/move'
import { appendChildren, create, createElement, setAttributes, setClassList, setEventListeners } from './utils/createElement'

const utils = {
  moveTo,
  moveLine,
  moveWithRound,
  moveWithLine,
}

const dom = {
  appendChildren,
  create,
  createElement,
  setAttributes,
  setClassList,
  setEventListeners,
}

export * from 'three'
export * from './threeCell'

export {
  Scene,
  Mesh,
  PerspectiveCamera,
  ModelLoader,
  createLabel,
  ModelType,
  Direction,
  utils,
  dom,
}
