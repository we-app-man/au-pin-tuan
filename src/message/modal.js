import Msg from '../mwx/msg'

export default {
  /**
   * 团截止
   */
  groupEnd() {
    const content = '已截止啦'
    Msg.showModal(content)
  },
  productInput() {
    const content = '商品信息有没有输入的哦'
    Msg.showModal(content)
  },
  productAdd() {
    const content = '还没有添加商品哦'
    Msg.showModal(content)
  },
  productInputNull() {
    const content = '商品信息输入不完整'
    Msg.showModal(content)
  },
}