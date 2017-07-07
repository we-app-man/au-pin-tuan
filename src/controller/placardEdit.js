import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import Group from '../dao/group'
import Image from '../dao/image'
// stack
import Stack from '../mwx/stack'
import WXimage from '../mwx/image'
import Event from '../mwx/event'
// msg
import MSG from '../mwx/msg'
// controller
import GoController from '../go'
// set
import Set from '../set/group'


export default {
  onLoad(ops) {
    const vm = Stack.page()
    vm.setData({
      id: ops.id,
    })
  },
  init() {
    const vm = Stack.page()
    const data = vm.data
    console.log(vm.data)

    co(function* c() {
      yield Dao.auLogin()

      const groupEdit = yield Group.edit(data.id)
      const group = groupEdit.group
      Set.Group(group)
      console.log(group)
    })
  },
  bindTextAreaBlur(e) {
    const vm = Stack.page()
    vm.setData({
      description: e.detail.value,
    })
    console.log(vm)
  },
  submit() {
    const vm = Stack.page()
    const description = vm.data.description
    const id = vm.data.group.id
    let image = vm.data.image
      // MSG.showModal(description)

    if (description.length < 7) {
      MSG.showModal('多写点描述吧')
      return
    }

    if (!image.length) {
      image = ''
    }

    image = image.toString()

    const obj = {
      id,
      description,
      image,
      type_id: 1,
    }

    co(function* c() {
      const req = yield Group.update(obj)
      console.log(req)

      if (req.group) {
        GoController.placardShowShare(id)
      }
    })
  },
  /**
   * 点击选择图片上传
   * @param {any} e
   */
  bindUpload(e) {
    const vm = Stack.page()
    const imgIndex = Event.dataset(e, 'id')
    const data = vm.data
    const imageList = data.imageList
    const image = data.image
    const delImage = image[imgIndex]
    co(function* c() {
      const filepath = yield WXimage.chooseImage()

      if (!filepath) {
        console.log('选择图片取消')
        return
      }
      console.log(filepath)
      console.log(imgIndex)
      imageList[imgIndex].src = filepath

      vm.setData({
        imageList,
      })

      const imgPath = yield Image.store(filepath)

      console.log(imgPath)

      imageList[imgIndex].src = imgPath.src

      image[imgIndex] = imgPath.path

      vm.setData({
        imageList,
        image,
      })

      if (delImage) {
        const obj = {
          id: data.group.id,
          index: imgIndex,
        }
        Image.destroy(obj)
      }
    })
  },
}