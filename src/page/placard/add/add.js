// controller
import Placard from '../../../controller/placard'

Page({
  data: {
    description: '',
    image: [],
    column: '编辑报名信息，分享到群，愉快的接龙吧！',
    placeholder: '1月12日， Opera House，聚会活动….',
    submitName: '发起接龙',
    imageLoad: true,
    imageList: [{
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
  bindImgDelete(e) {
    Placard.bindImgDelete(e)
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
  onReady() {},
  onHide() {},
  onUnload() {},
})