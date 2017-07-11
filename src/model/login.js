/**
 * api 数据接口模型
 * 登陆
 */
import {
  Promise,
} from '../libs/es6-promise'
import Message from '../message/modal'

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
            fail(err) {
              if (wx.openSetting) {
                wx.openSetting({
                  success: (res) => {
                    console.log(res)
                  },
                })
              } else {
                Message.openSetting()
              }
              reject(err)
            },
          })
        },
        fail(err) {
          console.warn('err 拒绝了授权')
          reject(err)
        },
      })
    })
  },
}