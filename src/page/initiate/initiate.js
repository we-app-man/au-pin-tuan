// controller
import Initiate from '../../controller/initiate'

Page({
  data: {},
  onLoad() {},
  onShow() {
    Initiate.init()
  },
  tapDetail(e) {
    Initiate.tapDetail(e)
  },
  /**
   * 监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  /**
   * 分享
   * @param {any} page
   * @returns
   */
  onShareAppMessage() {
    return {
      'title': '我发起的，搬个小板凳赶快上车咯🛵🛵🛵',
      'desc': 'desc',
      'path': '/page/initiate/initiate',
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})