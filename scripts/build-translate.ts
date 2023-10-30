import path from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

export async function isExists(path: string) {
  return await fs.pathExists(path)
}

export async function remove(filePath: string) {
  const files = fs.readdirSync(filePath)
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(filePath, files[i])
    const stat = fs.statSync(newPath)
    if (stat.isDirectory())
      remove(newPath)
    else
      fs.unlinkSync(newPath)
  }
  fs.rmdirSync(filePath)
}

export async function move(srcPath: string, path: string) {
  consola.info('start move...')
  consola.info('移动路径', srcPath)
  consola.info('目标路径', path)

  if (await isExists(path)) {
    consola.warn(path)
    consola.warn('The file already exists, delete ...')
    await remove(path)
  }

  try {
    await fs.copy(srcPath, path)
    consola.success('success!')
  }
  catch (err) {
    consola.error(err)
  }
}
