// controller
import Product from '../../../controller/product'

Page({
  data: {
    description: '',
    image: [],
    imageLoad: true,
    imageList: [{
      src: '',
    }, {
      src: '',
    }, {
      src: '',
    }],
  },
  onLoad() {},
  onShow() {
    Product.init()
  },
  bindTextAreaBlur(e) {
    Product.bindTextAreaBlur(e)
  },
  bindUpload(e) {
    Product.bindUpload(e)
  },
  submit() {
    Product.submit()
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
      'path': '/page/product/add/add',
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})