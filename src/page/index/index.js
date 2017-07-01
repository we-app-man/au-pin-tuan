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
      'title': 'AU 🐱‍🐉 接龙 || 下一个接龙 wang红 团长会是你吗?',
      'desc': 'AU 🐱‍🐉 接龙',
      'path': '/page/index/index',
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})