// provider 层 服务提供者
import {
  Promise,
} from '../libs/es6-promise'
// stack
import Stack from '../mwx/stack'
import Comment from '../dao/comment'
import Print from '../fn/print'
// set
import SetGroup from '../set/group'
// storage
import Storage from '../util/storage'

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
  /**
   * 更新接龙信息
   */
  upComment() {
    const vm = Stack.page()
    const data = vm.data

    const commentShow = Comment.show(data.id)

    commentShow.then((res) => {
      const commentsList = res.comments
      vm.setData({
        commentsList,
      })
      Print.Log(commentsList)
    })
  },
  isOpen() {
    const userInfo = Storage.get(Storage.userInfo)

    userInfo.then((res) => {
      Print.Log(res)
      if (res) {
        Print.Log('you')
        SetGroup.isOpenAsyn(res)
      }
    })
  },
}