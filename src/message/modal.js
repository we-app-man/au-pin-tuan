import Msg from '../mwx/msg'

export default {
  /**
   * 团截止
   */
  groupEnd() {
    const content = '已截止啦'
    Msg.showModal(content)
  },
}