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
  tapDesc() {
    Placard.tapDesc()
  },
  tapEdit() {
    Placard.tapEdit()
  },
  tapEmail() {
    Placard.tapEmail()
  },
  tapImage(e) {
    Placard.tapImage(e)
  },
  tapCodeImage() {
    Placard.tapCodeImage()
  },
  tabAvatar() {
    Placard.tabAvatar()
  },
  tabCommentDel(e) {
    Placard.tabCommentDel(e)
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
    const title = '澳洲群一键接龙'
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