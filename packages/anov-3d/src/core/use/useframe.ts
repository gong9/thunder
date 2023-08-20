import globalObjectManage from '../global/global'

/**
 * frame hook
 * @param cb
 */
const useframe = (cb: () => void) => {
  globalObjectManage.addFrameCallback(cb)

  return globalObjectManage.removeFrameCallback.bind(globalObjectManage, cb)
}

export default useframe