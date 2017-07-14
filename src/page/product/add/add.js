// controller
import Product from '../../../controller/product'

Page({
  data: {
    description: '',
    image: [],
    currencyCode: 'AUD$',
    column: '编辑团购信息，分享到群，愉快的接龙吧！',
    placeholder: '团购描述...',
    imageLoad: true,
    imageList: [{
      src: '',
    }, {
      src: '',
    }, {
      src: '',
    }],
  },
  onLoad() {
    Product.onLoad()
  },
  onShow() {
    Product.init()
  },
  bindTextAreaBlur(e) {
    Product.bindTextAreaBlur(e)
  },
  bindUpload(e) {
    Product.bindUpload(e)
  },
  bindProduct(e) {
    Product.bindProduct(e)
  },
  bindPorudctDel(e) {
    Product.bindPorudctDel(e)
  },
  tapAddProduct() {
    Product.tapAddProduct()
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
  // /**
  //  * 分享
  //  * @param {any} page
  //  * @returns
  //  */
  // onShareAppMessage() {
  //   return {
  //     'title': '谁是第一个发起者，搬个小板凳赶快上车咯🛵🛵🛵',
  //     'desc': 'desc',
  //     'path': '/page/product/add/add',
  //   }
  // },
  onReady() {},
  onHide() {},
  onUnload() {},
})