// stack
import Stack from '../mwx/stack'
// msg
import MSG from '../mwx/msg'

export default {
  submit() {
    const vm = Stack.page()
    const description = vm.data.description
    const imgUpload = vm.data.imgUpload
    if (description.length < 7) {
      MSG.showModal('多写点描述吧')
      return false
    }
    if (imgUpload) {
      MSG.showModal('图片在上传,等一下下咯')
      return false
    }
    return true
  },
}