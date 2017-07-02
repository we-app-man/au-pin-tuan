// 路由控制器
import Go from '../mwx/go'
import Route from '../route'

export default {
  /**
   * 跳转团详细页显示分享提示
   * @param {any} id
   */
  placardShowShare(id) {
    Go.navToOut(`${Route.placardShow}?share=true&id=${id}`)
  },
  groupType(id, type) {
    if (type === 1) {
      this.placardShow(id)
    }
  },
  groupEdit(id, type) {
    if (type === 1) {
      this.placardEdit(id)
    }
  },
  /**
   * 打开拼团详细页
   * @param {any} id
   */
  placardShow(id) {
    Go.navTo(`${Route.placardShow}?id=${id}`)
  },
  /**
   * 编辑拼团详细页
   * @param {any} id
   */
  placardEdit(id) {
    Go.navTo(`${Route.placardEdit}?id=${id}`)
  },
}