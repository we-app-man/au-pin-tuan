import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import Group from '../dao/group'
import Comment from '../dao/comment'
// stack
import Stack from '../mwx/stack'
// mgs
import MSG from '../mwx/msg'
// lang
import Lang from '../lang/lang'
import Config from '../config'
// storage
import Storage from '../util/storage'

export default {
  onLoad(ops) {
    const vm = Stack.page()
    vm.setData({
      id: ops.id,
      FileHost: Config.FileHost,
    })
    if (ops.share) {
      MSG.showModal(Lang.ShareFriend, Lang.PostOK)
    }
  },
  init() {
    const vm = Stack.page()
    const data = vm.data
    const that = this
    co(function* c() {
      yield Dao.auLogin()

      const groupShow = yield Group.show(data.id)
      console.log(groupShow.group)
      const group = groupShow.group

      if (group.image) {
        group.image = group.image.split(',')
      }

      const comment = groupShow.comment


      console.log(groupShow.group)

      if (!group) {
        console.log('group 错误了')
        return
      }

      vm.setData({
        group,
        comment: !comment ? '+1 😂 ' : comment.comment,
      })

      that.upComment()
      that.isOpen()
    })
  },
  bindKeyInput(e) {
    const vm = Stack.page()
    vm.setData({
      comment: e.detail.value,
    })
    console.log(vm)
  },
  /**
   * 提交接龙
   */
  submit() {
    const vm = Stack.page()
    const that = this
    const comment = vm.data.comment
    const id = vm.data.id

    // MSG.showModal(comment)

    const obj = {
      comment,
      group_id: id,
    }

    co(function* c() {
      const req = yield Comment.store(obj)
      console.log(req)

      that.upComment()
    })
  },
  /**
   * 更新接龙信息
   */
  upComment() {
    const vm = Stack.page()
    const data = vm.data

    co(function* c() {
      const commentShow = yield Comment.show(data.id)

      const commentsList = commentShow.comments

      vm.setData({
        commentsList,
      })
      console.log(commentsList)
    })
  },
  /**
   * 是否打开操作开关
   */
  isOpen() {
    const that = this
    co(function* c() {
      const userInfo = yield Storage.get(Storage.userInfo)
      console.log(userInfo)
      if (userInfo) {
        console.log('you')
        that.isOpenAsyn(userInfo)
      }
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
}