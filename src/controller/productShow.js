import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
// dao
import Dao from '../dao/base'
import Group from '../dao/group'
import Product from '../dao/product'
import Comment from '../dao/comment'
// stack
import Stack from '../mwx/stack'
// mgs
import MSG from '../mwx/msg'
// lang
import Lang from '../lang/lang'
import Config from '../config'

// image
import Image from '../mwx/image'
import Event from '../mwx/event'
// status
import Status from './status'
// go
import Go from '../go'
// set
import SetGroup from '../set/group'
import SetComment from '../set/comment'
import SetProduct from '../set/productShow'
// fn
import FnProduct from '../fn/product'
import Print from '../fn/print'
// provider
import GroupProvider from '../provider/group'
// filter
import CommentFilter from '../filter/comment'


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

    Status.loading(true)

    co(function* c() {
      yield Dao.auLogin()

      const groupShow = yield Group.show(data.id)

      const group = groupShow.group

      if (!group) {
        Print.Log('group 错误了')
        return
      }

      SetGroup.Group(group)

      SetGroup.comment(groupShow.comment)

      Print.Log(groupShow.group)

      const productShow = yield Product.show(data.id)
      const products = productShow.products
      Print.Log(productShow.products)

      SetProduct.products(products)

      GroupProvider.upComment()
      GroupProvider.isOpen()

      Status.loading(false)
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
    const comment = vm.data.comment
    const products = vm.data.products
    const id = vm.data.id

    if (!CommentFilter.isSubmit()) {
      return
    }

    const productComment = FnProduct.commentProduct(products)

    const obj = {
      comment,
      group_id: id,
      products,
      product_comment: productComment,
    }

    co(function* c() {
      const req = yield Comment.store(obj)
      Print.Log(req)

      GroupProvider.upComment()
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

    Group.updateOpen(group)
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
    Go.groupEdit(group.id, group.type_id)
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
  tabPlusCut(e) {
    const index = Event.dataset(e, 'index')
    const bool = Event.dataset(e, 'bool')
    SetProduct.productsIndex(bool, index)
  },
  tabPlus(e) {
    const index = Event.dataset(e, 'index')
    Print.Log(index)
    SetProduct.productsIndex(true, index)
  },
  tabCut(e) {
    const index = Event.dataset(e, 'index')
    Print.Log(index)
    SetProduct.productsIndex(false, index)
  },
}