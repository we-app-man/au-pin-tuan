// stack
import Stack from '../mwx/stack'
import FnImage from '../fn/image'
import Config from '../config'
import FnString from '../util/string'
// env
import Env from '../env'

export default {
  Group(data) {
    const vm = Stack.page()
    const group = data
    const description = group.description
    let desc = group.description
    const that = this
    let descMore = false
    let descBtn = false
    if (group.image) {
      group.image = group.image.split(',')
      that.ImageList(group.image)
      group.image = FnImage.AddHost(group.image)
    }

    if (description.length > 90) {
      desc = FnString.subString(description, 76, '...')
      descMore = true
      descBtn = true
    }

    const codeSrc = Env.codeApi + group.id

    vm.setData({
      group,
      description,
      descMore,
      descBtn,
      desc,
      codeSrc,
    })
  },
  ImageList(arr) {
    const vm = Stack.page()
    const len = arr.length
    const image = []
    const imageList = []
    let i
    for (i = 0; i < len; i += 1) {
      const item = arr[i]
      const obj = {
        src: Config.FileHost + item,
      }
      image.push(item)
      imageList.push(obj)
    }

    vm.setData({
      image,
      imageList,
    })
  },
}