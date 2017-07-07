import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import Comment from '../dao/comment'
// stack
import Stack from '../mwx/stack'
// mgs
// import MSG from '../mwx/msg'
// event
import Event from '../mwx/event'
import Go from '../go'
// page status
import Status from './status'

export default {
  init() {
    const vm = Stack.page()
    const that = this
    console.log(vm.data)

    Status.loading(true)

    co(function* c() {
      yield Dao.auLogin()

      const commentIndex = yield Comment.index()

      Status.loading(false)

      const groups = that.recoverGroup(commentIndex.comments)

      vm.setData({
        groups,
      })
      console.log(commentIndex)

      if (!groups.length) {
        Status.notfind(true)
      }
    })
  },
  /**
   * 查看详情
   * @param {any} e
   */
  tapDetail(e) {
    console.log(e)
    const id = Event.dataset(e, 'id')
    const type = Event.dataset(e, 'type')

    Go.groupType(id, type)
    console.log(type)
  },
  recoverGroup(comments) {
    const len = comments.length
    let i
    const group = []
    for (i = 0; i < len; i += 1) {
      const item = comments[i]

      group.push(item.group)
    }
    return group
  },
}