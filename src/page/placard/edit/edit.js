// controller
import PlacardController from '../../../controller/placardEdit'

Page({
  data: {
    description: '',
    image: [],
    placeholder: '1月12日， Opera House，聚会活动….',
    imageLoad: true,
    imageList: [{
      src: '',
    }, {
      src: '',
    }],
  },
  onLoad(options) {
    PlacardController.onLoad(options)
  },
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
  onReady() {},
  onHide() {},
  onUnload() {},
})