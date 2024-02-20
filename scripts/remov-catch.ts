import path from 'node:path'
import { consola } from 'consola'
import { isExists, move, remove } from './build-translate'

const currentPath = path.resolve(process.cwd(), './.parcel-cache')

isExists(currentPath).then((exists: boolean) => {
  if (exists) {
    consola.info('start remove...')
    consola.info('删除上次缓存', currentPath)

    remove(currentPath).then(() => {
      consola.success('success!')
    })
  }
  else {
    consola.info('无缓存文件.')
  }
})

// move public

const publicDistPath = path.resolve(process.cwd(), './dist/imgs')

isExists(publicDistPath).then((exists: boolean) => {
  if (exists) {
    remove(publicDistPath).then(() => {
      move(path.resolve(process.cwd(), './public'), path.resolve(process.cwd(), './dist'))
    })
  }
  else {
    move(path.resolve(process.cwd(), './public'), path.resolve(process.cwd(), './dist'))
  }
})
