Page({
  data: {},
  onLoad(options) {
    const vm = this

  },
  tapDetail() {
    wx.navigateTo({
      url: '/page/product/show/show',
    })
  },
  tapCopy() {
    wx.showModal({
      title: '',
      content: '复制成功',
      showCancel: false,
    })

    return false
  },
  handleTap2() {
    return false
  },
  onShow() {},
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
    const vm = this
    const data = vm.data

    return {
      'title': 'title',
      'desc': 'desc',
      'path': '/page/initiate/initiate',
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})