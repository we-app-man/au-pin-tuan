import { Promise } from '../libs/es6-promise'
import CONFIG from '../config'
import LOGIN from '../model/login'
import LANG from '../lang/lang'
import INITDATA from '../util/initData'
import BASE64 from './base64'
import LOG from '../model/log'

export default {
  App: getApp(),
  /**
   * 关闭当前页面，跳转到应用内的某个页面
   * wx.redirectTo(OBJECT)
   * 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。
   * 参数与路径之间使用?分隔，参数键与参数值用=相连，
   * 不同参数用&分隔；如 'path?key=value&key2=value2'
   */
  redirectTo(obj) {
    wx.redirectTo(obj)
  },
  /**
   * 初始化页面
   * @param {page vm} page
   */
  intPagedata(page) {
    page.setData(INITDATA.data)
  },
  /**
   * wx.switchTab(OBJECT)
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   */
  switchTab(page) {
    wx.switchTab({
      url: page,
    })
  },
  /**
   * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
   * @param {any} page
   */
  navTo(page) {
    wx.navigateTo({
      url: page,
    })
  },
  /**
   * 关闭当前页跳转
   * @param {any} url
   */
  navToOut(url) {
    wx.redirectTo({
      'url': url,
    })
  },
  /**
   * 返回上一页
   * @param {number} [delta=1]
   * @param {number} [time=1000]
   */
  navBack(delta = 1, time = 1000) {
    setTimeout(() => {
      wx.navigateBack({
        'delta': delta,
      })
    }, time)
  },
  /**
   * 提交成功后返回上一页
   * @param {string} [title='成功']
   * @param {number} [time=1000]
   */
  submitNavBack(title = LANG.Success, time = 1000) {
    const vm = this
    wx.showToast({
      'title': title,
      duration: time,
    })
    vm.navBack(1, time)
  },
  /**
   * 支付请求
   * @param {any} data
   * @returns
   */
  payment(data) {
    // const vm = this
    return new Promise((resolve) => {
      wx.requestPayment({
        timeStamp: data.TimeStamp.toString(),
        nonceStr: data.NonceStr,
        package: data.Package,
        signType: data.SignType,
        paySign: data.PaySign,
        success(res) {
          resolve(res)
        },
        fail(res) {
          resolve(res)
        },
      })
    })
  },
  /**
   * toast 显示文字、图标
   * @param {any} page
   * @param {string} [title='ok']
   * @param {number} [number=0]
   * @param {number} [duration=1500]
   */
  toast(page, title = 'ok', number = 0, duration = 1500) {
    const imgArr = [
      `${CONFIG.ImgHost}img/star.png`,
      // 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
    ]
    page.wetoast.toast({
      img: imgArr[number],
      'title': title,
      imgClassName: 'my_wetoast_img',
      'duration': duration,
      imgMode: 'scaleToFill',
    })
  },
  /**
   * toast loading
   * @param {any} page 页面栈
   * @param {number} [duration=0]
   */
  toastLoading(page, duration = 0) {
    console.log('toastLoading')
    page.wetoast.toast({
      // img: `https://weispp.github.io/img/balls.svg`,
      // img: `${CONFIG.ImgHost}img/balls.svg`,
      img: BASE64.loader,
      imgClassName: 'my_wetoast_img',
      'duration': duration,
      imgMode: 'scaleToFill',
    })
  },
  /**
   * toast 消息提示
   * @param {any} page 页面栈
   * @param {string} [title='ok']
   * @param {number} [duration=1500]
   */
  toastTitle(page, title = 'ok', duration = 1500) {
    page.wetoast.toast({
      'title': title,
      'duration': duration,
    })
  },
  /**
   * 返回数据错误统一处理
   * @param {any} page
   * @param {any} res
   * @returns
   */
  resData(page, res) {
    console.log(page + res)
  },
  /**
   * page error
   * @param {any} page
   * @param {any} msg
   */
  errorPage(page, msg) {
    const vm = page

    vm.wetoast.toast()

    page.setData({
      error: true,
      errorMsg: msg,
      emptyImg: `${CONFIG.ImgHost}img/empty.png`,
    })

    console.log('error: true,')
    vm.toastTitle(page, msg)
  },
  /**
   * 获取元素的 data 私有属性
   * @param {any} event
   * @param {any} key
   * @returns
   */
  event(event, key) {
    return event.currentTarget.dataset[key]
  },
  _isNone(s) {
    return s === '' || s == null || s === undefined
  },
}