import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import User from '../dao/user'
import Group from '../dao/group'
import Image from '../dao/image'
// stack
import Stack from '../mwx/stack'
import WXimage from '../mwx/image'
import Event from '../mwx/event'
// msg
import MSG from '../mwx/msg'
// controller
import GoController from './go'


export default {
  init() {
    const vm = Stack.page()
    console.log(vm.data)

    co(function* c() {
      const userToken = yield Dao.auLogin()

      console.log(userToken)

      const me = yield User.me()

      console.log(me)
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
      description,
      image,
      type_id: 1,
    }

    co(function* c() {
      const req = yield Group.store(obj)
      console.log(req)

      if (req.group) {
        const id = req.group.id
        console.log(id)
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
    })
  },
}