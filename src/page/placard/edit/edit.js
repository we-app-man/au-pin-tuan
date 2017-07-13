// controller
import PlacardController from '../../../controller/placardEdit'

Page({
  data: {
    description: '',
    image: [],
    placeholder:'举个栗子：今晚8点，西在北路公园集合，野跑。不想gua 掉的 赶紧接龙一起锻炼',
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