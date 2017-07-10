// 字符串操作
export default {
  /**
   * 截取字符串
   * @param {any} str
   * @param {any} len
   * @param {any} hasDot
   * @returns
   */
  subString(str, len, hasDot) {
    let newLength = 0
    let newStr = ''
    const chineseRegex = /[^\x00-\xff]/g
    let singleChar = ''
    const strLength = str.replace(chineseRegex, '**').length

    let i
    for (i = 0; i < strLength; i += 1) {
      singleChar = str.charAt(i).toString()
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2
      } else {
        newLength += 1
      }
      if (newLength > len) {
        break
      }
      newStr += singleChar
    }

    if (hasDot && strLength > len) {
      newStr += '...'
    }
    return newStr
  },
}