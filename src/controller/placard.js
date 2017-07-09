// stack
import Stack from '../mwx/stack'
// middleware
import GroupMiddleware from '../middleware/group'
// provider
import GroupProvider from '../provider/group'
import LoginProvider from '../provider/login'


export default {
  onLoad() {
    const vm = Stack.page()
    vm.setData({
      type_id: 1,
    })
  },
  init() {
    LoginProvider.initLoginUser()
  },
  bindTextAreaBlur(e) {
    const vm = Stack.page()
    vm.setData({
      description: e.detail.value,
    })
  },
  submit() {
    if (!GroupMiddleware.submit()) {
      return
    }
    GroupProvider.store()
  },
  /**
   * 点击选择图片上传
   * @param {any} e
   */
  bindUpload(e) {
    GroupProvider.imgUpload(e)
  },
}