import { emitter } from '../utils'
import createInteractionManager from '../utils/initEvents'
import global from './global/global'

/**
 * init scene life cycle
 */
const initLifeCycle = () => {
  emitter.on('before-render', () => {})

  emitter.on('after-render', () => {
    global.setInteractionManage(createInteractionManager())
  })
}

export default initLifeCycle