// stack
import Stack from '../mwx/stack'
import FnImage from './image'
import Config from '../config'

export default {
  setGroup(data) {
    const vm = Stack.page()
    const group = data
    const that = this
    if (group.image) {
      group.image = group.image.split(',')
      that.setImageList(group.image)
      group.image = FnImage.AddHost(group.image)
    }

    vm.setData({
      group,
      description: group.description,
    })
  },
  setImageList(arr) {
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