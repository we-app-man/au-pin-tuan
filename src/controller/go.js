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
}