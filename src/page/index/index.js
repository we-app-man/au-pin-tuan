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
    this.init()
    wx.stopPullDownRefresh()
  },
  /**
   * 分享
   * @param {any} page
   * @returns
   */
  onShareAppMessage() {
    const vm = this
    const data = vm.data

    return {
      'title': 'title',
      'desc': 'desc',
      'path': '/page/index/index',
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})