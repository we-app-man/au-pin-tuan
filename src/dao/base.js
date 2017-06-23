// dao 层 公共
import {
  Promise
} from '../libs/es6-promise'
import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
import API from '../util/api'
import DA from '../util/da'
import LANG from '../lang/lang'
import STORAGE from '../util/storage'
// model
import PAYMENT from '../model/payment'
import ADDRESS from '../model/address'


export default {
  /**
   * 微信支付 Base 类
   * 
   * @param {any} page 
   * @param {any} obj 
   */
  paymentWechat(page, obj) {
    let vm = page

    return new Promise((resolve, reject) => {
      co(function*() {

        API.toastLoading(vm)

        let paymentWechat = yield PAYMENT.Wechat(obj)

        if (!API.resData(vm, paymentWechat)) {
          return
        }

        console.log(paymentWechat)
        console.log('进入dao 层 base 类')
        let msg = ''

        let JsPay = paymentWechat.Data.JsPay
        if (!JsPay) {
          msg = LANG.CanNotPay

        } else {

          let wxpayapi = yield API.payment(JsPay)

          if (wxpayapi.errMsg) {
            msg = LANG.PayFail

          } else {

            msg = LANG.PaySuccess
          }
        }

        API.toastTitle(vm, msg)

        resolve(msg)

      })

    })

  },
  /**
   * 删除收获地址
   * 
   * @param {any} page 
   * @param {any} e 
   */
  addressDel(page, e) {
    return new Promise((resolve, reject) => {
      let vm = page
      let dataset = e.currentTarget.dataset
      co(function*() {

        API.toastLoading(vm)
        let addressMo = yield ADDRESS.Delete(dataset.id)
        vm.wetoast.toast()
        resolve(addressMo.Success)
      })

    })
  }
}