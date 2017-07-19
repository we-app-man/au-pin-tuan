// stack
import Stack from '../mwx/stack'
import FnImage from '../fn/image'
import Config from '../config'
import FnString from '../fn/string'
import Istorage from '../mwx/storage'
// env
import Env from '../env'
import EventM from '../mwx/event'

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

    if (description.length > 50) {
      desc = FnString.subString(description, 50, '...')
      descMore = true
      descBtn = true
    }

    const qrCodePath = group.qr_code_path || false

    let codeSrc = Env.codeApi + group.id

    if (qrCodePath) {
      codeSrc = Env.storagePath + qrCodePath
    }


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
      if (item) {
        const obj = {
          src: Config.FileHost + item,
          delete: true,
        }
        image.push(item)
        imageList.push(obj)
      }
    }

    vm.setData({
      image,
      imageList,
    })
  },
  ImageListAdd() {
    const vm = Stack.page()
    const imageList = vm.data.imageList
    const obj = {
      src: '',
    }
    imageList.push(obj)
    vm.setData({
      imageList,
    })
  },
  comment(comment) {
    const vm = Stack.page()
    vm.setData({
      comment: !comment ? '+1 😂 ' : comment.comment,
    })
  },
  isOpenAsyn(userInfo) {
    const vm = Stack.page()
    const data = vm.data
    const group = data.group

    const headId = group.head_id.toString() || ''
    const userId = userInfo.id.toString() || ''

    vm.setData({
      switch: headId === userId,
    })
  },
  description(e) {
    const vm = Stack.page()
    const description = EventM.value(e)
    vm.setData({
      description,
    })
    Istorage.set(Istorage.description, description)
  },
  products(products) {
    const vm = Stack.page()
    vm.setData({
      products,
    })
  },
}