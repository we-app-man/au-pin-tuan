Page({
  data: {},
  onLoad(options) {
    const vm = this
  },
  onShow() {},
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