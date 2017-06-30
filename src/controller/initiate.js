import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import Group from '../dao/group'
// stack
import Stack from '../mwx/stack'
// mgs
// import MSG from '../mwx/msg'
// event
import Event from '../mwx/event'
import Go from './go'
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
}