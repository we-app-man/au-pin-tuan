import Product from '../../../controller/productShow'

Page({
  data: {
    submitName: '跟团购',
    currencyCode: 'AUD$',
  },
  onLoad(options) {
    Product.onLoad(options)
  },
  onShow() {
    Product.init()
  },
  bindKeyInput(e) {
    Product.bindKeyInput(e)
  },
  bindKeyInputPhone(e) {
    Product.bindKeyInputPhone(e)
  },
  bindKeyInputName(e) {
    Product.bindKeyInputName(e)
  },
  tapOpen() {
    Product.tapOpen()
  },
  tapDesc() {
    Product.tapDesc()
  },
  tapEdit() {
    Product.tapEdit()
  },
  tapEmail() {
    Product.tapEmail()
  },
  tapImage(e) {
    Product.tapImage(e)
  },
  tapCodeImage() {
    Product.tapCodeImage()
  },
  tabAvatar() {
    Product.tabAvatar()
  },
  tabSecrecy() {
    Product.tabSecrecy()
  },
  tabCommentDel(e) {
    Product.tabCommentDel(e)
  },
  tabPlusCut(e) {
    Product.tabPlusCut(e)
  },
  tabPlus(e) {
    Product.tabPlus(e)
  },
  tabCut(e) {
    Product.tabCut(e)
  },
  formSubmit(e) {
    Product.formSubmit(e)
  },
  submit() {
    Product.submit()
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
      'path': `/page/product/show/show?id=${data.id}`,
    }
  },
  onReady() {},
  onHide() {},
  onUnload() {},
})