import fs from 'node:fs'
import path from 'node:path'
import * as babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import { consola } from 'consola'

// @ts-ignore
import presetTypescript from '@babel/preset-typescript'

export const getJsTsFilesInDirectory = (directoryPath: string, fileList: string[] = []) => {
  const files = fs.readdirSync(directoryPath)

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory())
      getJsTsFilesInDirectory(filePath, fileList)

    else if (['.js', '.ts'].includes(path.extname(filePath)))
      fileList.push(filePath)
  })

  return fileList
}

export const checkExportInFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const res = babel.transformSync(fileContent, {
    filename: filePath,
    presets: [presetEnv, presetTypescript],
    plugins: [],
  })

  return res?.code!.includes('export')
}

const removeFileExtension = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex !== -1)
    return filename.substring(0, lastDotIndex)

  return filename
}

const run = (cpath: string, outPath: string, filename: string) => {
  consola.info('正在处理...')

  const files = getJsTsFilesInDirectory(cpath)
  const noExportFiles = files.filter(file => checkExportInFile(file))

  // todo: bugfix
  const lastOutput = noExportFiles.reduce((prev: string, curr: string) => {
    const lastPath = removeFileExtension(path.relative(path.join(outPath), curr))
    const output = `
        export * from '${lastPath.replace(/\.\.\/node_modules\//g, '')}'
        `
    return `${prev + output}\n`
  }, '')

  fs.writeFileSync(`${outPath}/${filename}`, lastOutput)
}

run(path.resolve(__dirname, '../packages/anov-3d/node_modules/three/examples/jsm'), path.resolve(__dirname, '../packages/anov-3d/src'), 'output.ts')
