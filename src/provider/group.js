// provider 层 服务提供者
import {
  Promise,
} from '../libs/es6-promise'
import Comment from '../dao/comment'

export default {
  /**
   * @returns
   */
  commentDel(id) {
    return new Promise((resolve) => {
      const reqData = Comment.destroy(id)
      reqData.then((val) => {
        resolve(val)
      })
    })
  },
}