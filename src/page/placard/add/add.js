// controller
import Placard from '../../../controller/placard'

Page({
  data: {
    description: '',
    image: [],
    column: '编辑报名信息，分享到群，愉快的接龙吧！',
    placeholder: '1月12日， Opera House，聚会活动….',
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
    Placard.onLoad()
  },
  onShow() {
    Placard.init()
  },
  bindTextAreaBlur(e) {
    Placard.bindTextAreaBlur(e)
  },
  bindUpload(e) {
    Placard.bindUpload(e)
  },
  submit() {
    Placard.submit()
  },
  /**
   * 监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  // /**
  //  * 分享
  //  * @returns
  //  */
  // onShareAppMessage() {
  //   return {
  //     'title': '谁是第一个发起者，搬个小板凳赶快上车咯🛵🛵🛵',
  //     'desc': 'desc',
  //     'path': '/page/placard/add/add',
  //   }
  // },
  onReady() {},
  onHide() {},
  onUnload() {},
})