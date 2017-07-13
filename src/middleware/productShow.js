import Stack from '../mwx/stack'
import Message from '../message/modal'

export default {
  submit() {
    const vm = Stack.page()
    const data = vm.data
    const totalPrice = data.totalPrice || 0
    const phone = data.phone || 0
    const name = data.name || 0

    if (!(totalPrice - 0)) {
      Message.productAdd()
      return false
    }

    if (!phone) {
      Message.phoneNot()
      vm.setData({
        secrecy: true,
      })
      return false
    }

    if (!name) {
      Message.nameNot()
      vm.setData({
        secrecy: true,
      })
      return false
    }

    return true
  },
}