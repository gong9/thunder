import globalObjectManage from '../global/global'

/**
 * 获取核心场景控件，必须在场景上下文中使用
 * @returns
 */
const useScene = () => {
  return {
    scene: globalObjectManage.scene,
    domElement: globalObjectManage.domElement,
    orbitControls: globalObjectManage.orbitControls,
    camera: globalObjectManage.camera,
    renderer: globalObjectManage.renderer,
  }
}

export default useScene