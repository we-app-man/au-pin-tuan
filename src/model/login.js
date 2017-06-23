/**
 * api 数据接口模型
 * 登陆
 */
import {
  Promise,
} from '../libs/es6-promise'
import STORAGE from '../util/storage'
// import http from '../util/http'
import config from '../config'

import Lang from '../lang/lang'


const REQ_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

const HEADER = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencode',
}


export default {
  /**
   * 登陆
   *
   * @api {post} package/platform/login 登陆
   * @apiName login
   * @apiGroup login
   *
   * @请求参数
   * @apiParam {String} key 认证密钥.
   * @apiParam {Number} LoginType 登陆类型 10 .
   * @apiParam {Object} Client 客户端信息.
   * @apiParam {Object} SmallProgram 小程序登陆生成信息.
   *
   * @服务接口返回字段
   * @apiSuccess {Object[]} Data  登陆信息.
   * @apiSuccess {Number} Total  等待.
   * @apiSuccess {Number} TotalPage  等待.
   * @apiSuccess {Boolean} Success  状态.
   * @apiSuccess {Number} Code  状态码.
   * @apiSuccess {String} Message  状态提示信息.
   *
   * @apiSampleRequest https://api.xx.com/platform/login
   *
   * @returns
   */
  Login(data = {}) {
    return new Promise((resolve, reject) => {
      console.log('网站登录')
      const url = `${config.Host}platform/login`
      const obj = {
        LoginType: 10,
        Type: 10,
        Client: {
          AppKey: config.AppKey,
          FromClient: 'SmallProgram',
        },
        SmallProgram: {
          IV: data.iv,
          EncryptedData: data.encryptedData,
          SmallProgramJsCode: data.code,
        },
      }

      wx.request({
        url,
        data: obj,
        header: HEADER,
        method: REQ_METHOD.POST,
        success(res) {
          const resData = res.data
          console.log(resData)
          resolve(resData)
        },
        fail: (res) => {
          console.log('网站登录失败')
          console.log(res)
          reject(res)
        },
        complete: () => {
          console.log('网站登complete')
        },
      })
    })
  },
  /**
   * 小程序 微信内部登陆
   * @returns
   */
  WXLogin() {
    return new Promise((resolve, reject) => {
      console.log('WXLogin')
      wx.login({
        success(res) {
          console.log('微信登录 获取getUserInfo')
          wx.getUserInfo({
            success(info) {
              const data = info
              data.code = res.code
              wx.setStorageSync(STORAGE.wxUserInfo, data)
              wx.setStorageSync(STORAGE.wxUser, data.code)
              console.log('getUserInfo sucess')
              resolve(data)
            },
            fail(err) {
              console.log('用户取消授权err')
              wx.showModal({
                title: Lang.Point,
                content: Lang.RefuseToAuthorize,
                success(res) {
                  if (res.confirm) {
                    const page = getCurrentPages()
                  }
                },
              })

              reject(err)
            },
          })
        },
        fail(res) {
          console.log('微信登录失败')
          console.log(res)
        },
        complete() {
          console.log('微信登录complete')
        },
      })
    })
  },
  /**
   * 全全登陆
   *
   * @returns
   */
  LOGINAll() {
    const vm = this
    console.log('LOGINAll')
    return new Promise((resolve) => {
      vm.WXLogin()
        .then((res) => {
          console.log('微信登录回调')
          vm.Login(res)
            .then((res2) => {
                // console.log(res2)

                if (res2.Data) {
                  wx.setStorageSync(STORAGE.userKey, res2.Data.Key)
                  console.log('存储新的userkey')
                }
                resolve(res2)
              },
              (err) => {
                console.log(err)
                resolve(err)
              })
        })
        .catch((error) => {
          console.log(`catch${error}`)
          resolve(false)
        })
    })
  },
}