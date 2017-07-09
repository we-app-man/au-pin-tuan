// stack
import Stack from '../mwx/stack'
// middleware
import GroupMiddleware from '../middleware/group'
import ProductMiddleware from '../middleware/product'
// provider
import GroupProvider from '../provider/group'
import LoginProvider from '../provider/login'
// print
import Print from '../fn/print'
// set
import SetProduct from '../set/product'
// message
import Message from '../message/modal'
// envent
import Event from '../mwx/event'


export default {
  onLoad() {
    const vm = Stack.page()
    vm.setData({
      type_id: 2,
    })
  },
  init() {
    LoginProvider.initLoginUser()
  },
  bindTextAreaBlur(e) {
    const vm = Stack.page()
    vm.setData({
      description: Event.value(e),
    })
  },
  submit() {
    if (!GroupMiddleware.submit()) {
      return
    }
    if (!ProductMiddleware.submit()) {
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
  /**
   * 添加商品
   */
  tapAddProduct() {
    if (!ProductMiddleware.add()) {
      Message.productInput()
      return
    }

    SetProduct.push()

    Print.Log('ok')
  },
  bindProduct(e) {
    const vm = Stack.page()
    const val = Event.value(e)
    const index = Event.dataset(e, 'index')
    const name = Event.dataset(e, 'name')
    const products = vm.data.products
    products[index][name] = val

    SetProduct.products(products)
  },
  bindPorudctDel(e) {
    const index = Event.dataset(e, 'index')
    SetProduct.removeIndex(index)
  },
}