import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import User from '../dao/user'
import Group from '../dao/group'
// stack
import Stack from '../mwx/stack'
// mgs
import MSG from '../mwx/msg'

export default {
  init(page) {
    const vm = page
    console.log(vm.data)

    co(function* c() {
      const userToken = yield Dao.auLogin()

      console.log(userToken)

      const me = yield User.me()

      console.log(me)
    })
  },
  bindTextAreaBlur(e) {
    const vm = Stack.page()
    vm.setData({
      description: e.detail.value,
    })
    console.log(vm)
  },
  submit() {
    const vm = Stack.page()
    const description = vm.data.description

    MSG.showModal(description)

    const obj = {
      description,
      type_id: 1,
    }
    Group.group(obj)
  },
}