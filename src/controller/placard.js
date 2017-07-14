// stack
import Stack from '../mwx/stack'
// middleware
import GroupMiddleware from '../middleware/group'
// provider
import GroupProvider from '../provider/group'
import LoginProvider from '../provider/login'
import StoragePro from '../provider/storage'
import Istorage from '../mwx/storage'
import Event from '../mwx/event'


export default {
  onLoad() {
    const vm = Stack.page()
    vm.setData({
      type_id: 1,
    })
  },
  init() {
    LoginProvider.initLoginUser()
    StoragePro.description()
  },
  bindTextAreaBlur(e) {
    const vm = Stack.page()
    const description = Event.value(e)
    vm.setData({
      description,
    })
    Istorage.set(Istorage.description, description)
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