import {
  Promise,
} from '../libs/es6-promise'
import HTTP from '../util/http'
import CONFIG from '../config'


export default {
  /**
   * 我的信息
   * @returns
   */
  me() {
    return new Promise((resolve) => {
      const url = `${CONFIG.ApiHost}api/user`

      const me = HTTP.get(url)

      me.then((res) => {
        console.log(`me++${res}`)
        resolve(res)
      })

      me.catch((err) => {
        console.log(`me++${err}`)
        resolve(false)
      })
    })
  },
}