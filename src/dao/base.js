// dao 层 公共
import {
  Promise,
} from '../libs/es6-promise'
// stroage
import Storage from '../util/storage'
import Login from '../middleware/login'
// Env
import Env from '../env'

export default {
  /**
   * AU微信用户一站式登陆
   * @returns
   */
  auLogin() {
    return new Promise((resolve) => {
      const ttl = Env.ttl
      const keyTime = Storage.get(Storage.userkeyTime)
      const nowTime = new Date().getTime()
    })
  },
}