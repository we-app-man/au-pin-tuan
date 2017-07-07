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
// image
import Image from '../mwx/image'
import Event from '../mwx/event'
// status
import Status from './status'
// go
import GoController from './go'
// set
import Set from '../set/group'
import Print from '../fn/print'
// provider
import GroupProvider from '../provider/group'
// set
import SetComment from '../set/comment'

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

    Status.loading(true)

    co(function* c() {
      yield Dao.auLogin()

      const groupShow = yield Group.show(data.id)

      Status.loading(false)

      const group = groupShow.group

      Set.Group(group)

      const comment = groupShow.comment

      Print.Log(groupShow.group)

      if (!group) {
        Print.Log('group 错误了')
        return
      }

      vm.setData({
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
    Print.Log(vm)
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
      Print.Log(req)

      that.upComment()
    })
  },
  tapImage(e) {
    const vm = Stack.page()
    const images = vm.data.group.image || []
    const index = Event.dataset(e, 'index')
    Print.Log(images)
    Image.previewImage(images[index], images)
  },
  tapCodeImage() {
    const vm = Stack.page()
    const codeSrc = vm.data.codeSrc
    Image.previewImage(codeSrc, [codeSrc])
  },
  /**
   * 修改团状态 open
   */
  tapOpen() {
    const vm = Stack.page()
    const data = vm.data
    const group = data.group
      /* eslint no-unused-expressions: "error" */
    if (group.open === 1) {
      group.open = 2
    } else {
      group.open = 1
    }

    vm.setData({
      group,
    })

    co(function* c() {
      yield Group.updateOpen(group)
    })
  },
  /**
   * 显示更多描述
   */
  tapDesc() {
    const vm = Stack.page()
    const data = vm.data
    if (data.descMore) {
      vm.setData({
        descBtn: !data.descBtn,
      })
    }
  },
  tapEdit() {
    const vm = Stack.page()
    const data = vm.data
    const group = data.group
    GoController.groupEdit(group.id, group.type_id)
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
      Print.Log(commentsList)
    })
  },
  /**
   * 删除跟团信息
   * @param {any} e
   */
  tabCommentDel(e) {
    const id = Event.dataset(e, 'id')
    const alias = Event.dataset(e, 'alias')
    const index = Event.dataset(e, 'index')
    const content = `确定要删除 ${alias} 的信息吗?`
    const title = '删除确认'
    MSG.showModalCancel(content, title, (bool) => {
      if (bool) {
        SetComment.commentDel(index)
        GroupProvider.commentDel(id)
      }
    })

    Print.Log(id)
  },
  /**
   * 是否打开操作开关
   */
  isOpen() {
    const that = this
    co(function* c() {
      const userInfo = yield Storage.get(Storage.userInfo)
      Print.Log(userInfo)
      if (userInfo) {
        Print.Log('you')
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