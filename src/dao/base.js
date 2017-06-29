// dao 层 公共
import {
  Promise,
} from '../libs/es6-promise'
import Config from '../config'
// stroage
import Storage from '../util/storage'

export default {
  /**
   * 微信登陆获取用户信息
   * @returns
   */
  wxLoginGetUserInfo() {
    return new Promise((resolve, reject) => {
      // 调用登录接口
      wx.login({
        success(response) {
          const code = response.code
          wx.getUserInfo({
            success(resp) {
              const obj = {
                code,
                iv: resp.iv,
                encryptedData: resp.encryptedData,
              }

              resolve(obj)
            },
          })
        },
        fail(err) {
          reject(err)
        },
      })
    })
  },
  /**
   * AU微信用户一站式登陆
   * @returns
   */
  auLogin() {
    return new Promise((resolve) => {
      const wxUserInfo = this.wxLoginGetUserInfo()

      wxUserInfo.then((resp) => {
        wx.request({
          url: `${Config.ApiHost}api/wx/login`,
          method: 'POST',
          data: {
            code: resp.code,
            iv: resp.iv,
            encryptedData: resp.encryptedData,
          },
          header: {
            'content-type': 'application/json',
          },
          success(res) {
            console.log(res.data)

            Storage.set(Storage.userKey, res.data.token)

            resolve(res)
          },
          fail(err) {
            console.log(err)
            resolve(false)
          },
        })

        console.log(resp)
      })

      wxUserInfo.catch((err) => {
        console.log('err')
        console.log(err)
        resolve(false)
      })
    })
  },
}