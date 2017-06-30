import { Promise } from '../libs/es6-promise'
import STORAGE from './storage'
import LOGIN from '../model/login'
import LANG from '../lang/lang'

const REQ_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

const HEADER = {
  'Cache-Control': 'no-cache',
  // 'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ',
}


export default {
  /**
   * 发起 POST 请求
   * @param {any} url
   * @param {any} [data={}]
   * @returns
   */
  post(url, data = {}) {
    const vm = this
    return new Promise((resolve, reject) => {
      const key = wx.getStorageSync(STORAGE.userKey)
        // let key = "123"
      if (!key) {
        const obj = {
          Success: false,
          Code: -9999,
          Message: LANG.LoginKeyNotFind,
        }
        resolve(obj)
        return
      }

      HEADER.Authorization = `Bearer ${key}`

      wx.request({
        url,
        data,
        header: HEADER,
        method: REQ_METHOD.POST,
        success(res) {
          const resData = res.data
          vm.serveReact(res)

          resolve(resData)
        },
        fail: (res) => {
          console.log('请求失败')
          reject(res)
        },
      })
    })
  },
  /**
   * 发起GET请求
   *
   * @param {any} url
   * @param {any} data
   * @returns
   */
  get(url, data = {}) {
    return new Promise((resolve) => {
      console.log('get')
      console.log(url)

      const key = wx.getStorageSync(STORAGE.userKey)
        // let key = "123"
      if (!key) {
        const obj = {
          Success: false,
          Code: -9999,
          Message: LANG.LoginKeyNotFind,
        }
        resolve(obj)
        return
      }

      HEADER.Authorization = `Bearer ${key}`

      wx.request({
        url,
        data,
        header: HEADER,
        method: REQ_METHOD.GET,
        success(res) {
          resolve(res.data)
        },
        fail: () => {
          console.log('报错了')
        },
      })
    })
  },
  /**
   * service 数据返回响应处理
   *
   * @param {any} res
   */
  serveReact(res) {
    const data = res.data
    if (typeof(res) !== 'object') {
      return
    }
    if (data.Code === -2000) {
      LOGIN.LOGINAll()

      const paeges = getCurrentPages()
      const vm = paeges[paeges.length - 1]
      vm.wetoast.toast()
      vm.setData({
        error: true,
        errorMsg: vm.data.LANG.LoginRefresh,
        emptyImg: vm.data.emptyImg,
      })
    }
  },
}