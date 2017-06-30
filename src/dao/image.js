import {
  Promise,
} from '../libs/es6-promise'
import Image from '../model/image'

export default {
  /**
   * 上传图片
   * @param {any} filepath
   * @returns
   */
  store(filepath) {
    return new Promise((resolve) => {
      resolve(Image.store(filepath))
    })
  },
}