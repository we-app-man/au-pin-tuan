import Placard from '../../../controller/placardShow'

Page({
  data: {},
  onLoad(options) {
    Placard.onLoad(options)
  },
  onShow() {
    Placard.init()
  },
  bindKeyInput(e) {
    Placard.bindKeyInput(e)
  },
  tapOpen() {
    Placard.tapOpen()
  },
  tapImage(e) {
    Placard.tapImage(e)
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
  /**
   * 分享
   * @param {any} page
   * @returns
   */
  onShareAppMessage() {
    const data = this.data
    const title = `${data.group.alias}发布了接龙, 快跟上 🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉`
    const desc = `${data.group.description}..`
    return {
      'title': title,
      'desc': desc,
      'path': `/page/placard/show/show?id=${data.id}`,
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})