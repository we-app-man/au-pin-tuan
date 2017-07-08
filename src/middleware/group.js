// stack
import Stack from '../mwx/stack'
// msg
import MSG from '../mwx/msg'

export default {
  submit() {
    const vm = Stack.page()
    const description = vm.data.description
    if (description.length < 7) {
      MSG.showModal('多写点描述吧')
      return false
    }
    return true
  },
}