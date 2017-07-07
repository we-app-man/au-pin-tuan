import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import Group from '../dao/group'
// stack
import Stack from '../mwx/stack'
// mgs
import MSG from '../mwx/msg'
// event
import Event from '../mwx/event'
import Go from '../go'
// page status
import Status from './status'

export default {
  init() {
    const vm = Stack.page()
    console.log(vm.data)

    Status.loading(true)

    co(function* c() {
      yield Dao.auLogin()

      const groupIndex = yield Group.index()

      Status.loading(false)

      const groups = groupIndex.group

      vm.setData({
        groups,
      })
      console.log(groupIndex)

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
  /**
   * 删除
   * @param {any} e
   */
  tapDel(e) {
    const id = Event.dataset(e, 'id')
    const that = this
    const content = `确定要删除 No: ${id} 吗?`
    const title = '删除确认'
    MSG.showModalCancel(content, title, (bool) => {
      if (bool) {
        that.delGroup(id)
      }
    })
  },
  delGroup(id) {
    const that = this
    co(function* c() {
      const delReq = yield Group.destroy(id)

      if (delReq.error) {
        MSG.showModal(delReq.message)

        return
      }

      MSG.title('ok')

      that.init()
      console.log(delReq)
    })
  },
}