// controller
import PlacardController from '../../../controller/placard'

Page({
  data: {
    description: '',
    image: [],
    imageLoad: true,
    imageList: [{
      src: '',
    }, {
      src: '',
    }],
  },
  onLoad() {},
  onShow() {
    PlacardController.init()
  },
  bindTextAreaBlur(e) {
    PlacardController.bindTextAreaBlur(e)
  },
  bindUpload(e) {
    PlacardController.bindUpload(e)
  },
  submit() {
    PlacardController.submit()
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
      'title': '谁是第一个发起者，搬个小板凳赶快上车咯🛵🛵🛵',
      'desc': 'desc',
      'path': '/page/placard/add/add',
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})