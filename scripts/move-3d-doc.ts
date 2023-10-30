import path from 'node:path'
import fs from 'fs-extra'
import { move } from './build-translate'

const startMove = async () => {
  await move(path.resolve(process.cwd(), './docs/.vitepress/dist'), path.resolve(process.cwd(), './docs/dist'))
  await move(path.resolve(process.cwd(), './docs/imgs'), path.resolve(process.cwd(), './docs/dist/imgs'))
  await move(path.resolve(process.cwd(), './docs/model'), path.resolve(process.cwd(), './docs/dist/model'))
}

startMove()