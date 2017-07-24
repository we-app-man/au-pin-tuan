// controller
import Product from '../../../controller/productEdit'

Page({
  data: {
    description: '',
    image: [],
    currencyCode: 'AUD$',
    column: '编辑团购信息，分享到群，愉快的接龙吧！',
    placeholderTitle: '一句话标题',
    placeholder: '团购描述...',
    submitName: '更新接龙',
    imageLoad: true,
    imageList: [{
      src: ''
    }]
  },
  onLoad(options) {
    Product.onLoad(options)
  },
  onShow() {
    Product.init()
  },
  bindTextAreaBlur(e) {
    Product.bindTextAreaBlur(e)
  },
  bindTitle(e) {
    Product.bindTitle(e)
  },
  bindUpload(e) {
    Product.bindUpload(e)
  },
  bindProduct(e) {
    Product.bindProduct(e)
  },
  bindPorudctDel(e) {
    Product.bindPorudctDel(e)
  },
  tapAddProduct() {
    Product.tapAddProduct()
  },
  bindImgDelete(e) {
    Product.bindImgDelete(e)
  },
  submit() {
    Product.submit()
  },
  catchtap() {},
  onReady() {},
  onHide() {},
  onUnload() {},
})