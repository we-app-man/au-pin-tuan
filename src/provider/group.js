// provider 层 服务提供者
import {
  Promise,
} from '../libs/es6-promise'
import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
import Image from '../dao/image'
// stack
import Stack from '../mwx/stack'
import WXimage from '../mwx/image'
import Event from '../mwx/event'
import Comment from '../dao/comment'
import Print from '../fn/print'
import Go from '../go'
// set
import SetGroup from '../set/group'
// storage
import Storage from '../util/storage'
// doa
import Group from '../dao/group'
import Istorage from '../mwx/storage'


export default {
  store() {
    const vm = Stack.page()
    const data = vm.data
    const description = data.description
    const products = data.products
    const typeId = data.type_id
    let image = data.image

    if (!image.length) {
      image = ''
    }

    image = image.toString()

    const obj = {
      description,
      image,
      products,
      type_id: typeId,
    }

    const req = Group.store(obj)
    Print.Log(req)

    req.then((val) => {
      const id = val.group.id
      Print.Log(id)

      Istorage.remove(Istorage.description)
      Istorage.remove(Istorage.image)
      Istorage.remove(Istorage.imageList)

      if (typeId === 1) {
        Go.placardShowShare(id)
      } else {
        Go.productShowShare(id)
      }
    })
  },
  imgUpload(e) {
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
        imgUpload: true,
      })

      const imgPath = yield Image.store(filepath)

      console.log(imgPath)

      imageList[imgIndex].src = imgPath.src

      image[imgIndex] = imgPath.path

      vm.setData({
        imageList,
        image,
        imgUpload: false,
      })

      Istorage.set(Istorage.image, image)
      Istorage.set(Istorage.imageList, imageList)
    })
  },
  /**
   * @returns
   */
  commentDel(id) {
    return new Promise((resolve) => {
      const reqData = Comment.destroy(id)
      reqData.then((val) => {
        resolve(val)
      })
    })
  },
  /**
   * 更新接龙信息
   */
  upComment() {
    const vm = Stack.page()
    const data = vm.data

    const commentShow = Comment.show(data.id)

    commentShow.then((res) => {
      const commentsList = res.comments
      vm.setData({
        commentsList,
      })
      Print.Log(commentsList)
    })
  },
  isOpen() {
    const userInfo = Storage.get(Storage.userInfo)

    userInfo.then((res) => {
      Print.Log(res)
      if (res) {
        Print.Log('you')
        SetGroup.isOpenAsyn(res)
      } else {
        Print.Log('mei you userinfo')
      }
    })
  },
}