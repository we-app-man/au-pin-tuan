import {
  Promise,
} from '../libs/es6-promise'
import Group from '../model/group'

export default {
  /**
   * 我发起的
   * @returns
   */
  index() {
    return new Promise((resolve) => {
      resolve(Group.index())
    })
  },
  /**
   * 发起团信息
   * @returns
   */
  store(obj) {
    return new Promise((resolve) => {
      resolve(Group.store(obj))
    })
  },
  /**
   * 查询一个团信息
   * @param {any} id
   * @returns
   */
  show(id) {
    return new Promise((resolve) => {
      resolve(Group.show(id))
    })
  },
  updateOpen(obj) {
    return new Promise((resolve) => {
      resolve(Group.updateOpen(obj))
    })
  },
}