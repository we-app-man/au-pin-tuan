/**
 * 手势方案
 */

export default {
  transformX(num) {
    return `transform: translate(-${num}px, 0);`
  },
  /**
   * 手势滑动开始
   * 
   * @param {any} page 
   * @param {any} event 
   */
  handleS(page, event) {
    let e = event
    if (e.touches.length == 1) {
      page.setData({
        //设置触摸起始点方向位置
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      })
    }
  },
  /**
   * 手势滑动
   * 
   * @param {any} event 
   */
  handleM(page, event, ilist = 'list') {
    let e = event
    let vm = page
    let dataset = e.currentTarget.dataset
    let maxDistance = 10
    let index = dataset.index
    let list = vm.data[ilist]

    let mLeft = dataset.mleft || 50

    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      let moveX = e.touches[0].clientX
      let moveY = e.touches[0].clientY

      //手指起始点位置与移动期间的差值
      let disX = vm.data.startX - moveX
      let disY = vm.data.startY - moveY

      // console.log("moveX:" + moveX + "=" + disX)
      // console.log('moveY:' + moveY + "=" + disY)

      let txtStyle = ""
      if (disX <= maxDistance || disY > disX) { //如果移动距离小于等于0，位置不变
        txtStyle = this.transformX(0)
          // console.log("move 1")
      } else if (disX > maxDistance && disX > disY) { //移动距离大于0，等于手指移动距离
        txtStyle = this.transformX(disX)
          // console.log("move 2")
        if (disX >= mLeft) {
          // console.log("move 3")
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = this.transformX(mLeft)
        }
      }

      list[index].txtStyle = txtStyle
        // this.resetOtherSty(list, index)
        //更新列表的状态
      vm.setData({
        list: this.resetOtherSty(list, index)
      })
    }
  },
  /**
   * 手势滑动结束
   * 
   * @param {any} page 
   * @param {any} event 
   * @param {string} [ilist='list'] 
   */
  handleE(page, event, ilist = 'list') {
    let e = event
    let vm = page
    let dataset = e.currentTarget.dataset

    let index = dataset.index

    let list = vm.data[ilist]

    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      let endX = e.changedTouches[0].clientX
      let endY = e.changedTouches[0].clientY
        //触摸开始与结束，手指移动的距离
      let disX = vm.data.startX - endX
      let disY = vm.data.startY - endY

      let mLeft = dataset.mleft

      let txtStyle = this.transformX(0)

      if (Math.abs(disX) > Math.abs(disY)) {
        // console.log("左右")

        txtStyle = disX > mLeft / 2 ? this.transformX(mLeft) : ""

      } else {
        // console.log("上下")
      }
      //如果距离小于删除按钮的1/2，不显示删除按钮
      // let txtStyle = disX > mLeft / 2 || disY < disX ? this.transformX(mLeft) : this.transformX(0)

      list[index].txtStyle = txtStyle
        //更新列表的状态
      vm.setData({
        list: list
      })
    }
  },
  /**
   * 手势滑动开始 商品列表 双list
   * 
   * @param {any} page 
   * @param {any} event 
   */
  handleST(page, event) {
    let e = event
    if (e.touches.length == 1) {
      page.setData({
        //设置触摸起始点方向位置
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      })
    }
  },
  /**
   * 手势滑动开始 商品列表 双list
   * 
   * @param {any} page 
   * @param {any} event 
   * @param {string} [ilist='list'] 
   */
  handleMT(page, event, ilist = 'list') {
    let e = event
    let vm = page

    let dataset = e.currentTarget.dataset
    let maxDistance = 10
    let index = dataset.index
    let shopindex = dataset.shopindex
    let list = vm.data[ilist]

    let delBtnWidth = list[shopindex].GrabAttrs[index].delBtnWidth

    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      let moveX = e.touches[0].clientX
      let moveY = e.touches[0].clientY


      //手指起始点位置与移动期间的差值
      let disX = vm.data.startX - moveX
      let disY = vm.data.startY - moveY

      console.log("moveX:" + moveX + "=" + disX)
      console.log('moveY:' + moveY + "=" + disY)


      let txtStyle = ""
      if (disX <= maxDistance || disY > disX) { //如果移动距离小于等于0，位置不变
        txtStyle = this.transformX(0)
        console.log("move 1")
      } else if (disX > maxDistance && disX > disY) { //移动距离大于0，等于手指移动距离
        txtStyle = this.transformX(disX)
        console.log("move 2")
        if (disX >= delBtnWidth) {
          console.log("move 3")
            //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = this.transformX(delBtnWidth)
        }
      }
      let index = dataset.index
      let shopindex = dataset.shopindex
      let list = vm.data.list

      list[shopindex].GrabAttrs[index].txtStyle = txtStyle
        //更新列表的状态
      vm.setData({
        list: list
      })
    }
  },
  /**
   * 手势滑动结束 商品列表 双list
   * 
   * @param {any} page 
   * @param {any} event 
   * @param {string} [ilist='list'] 
   */
  handleET(page, event, ilist = 'list') {
    let e = event
    let vm = page
    let dataset = e.currentTarget.dataset

    let index = dataset.index
    let shopindex = dataset.shopindex
    let list = vm.data[ilist]

    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      let endX = e.changedTouches[0].clientX
      let endY = e.changedTouches[0].clientY
        //触摸开始与结束，手指移动的距离
      let disX = vm.data.startX - endX
      let disY = vm.data.startY - endY

      let delBtnWidth = list[shopindex].GrabAttrs[index].delBtnWidth

      let txtStyle = this.transformX(0)

      if (Math.abs(disX) > Math.abs(disY)) {
        // console.log("左右")
        txtStyle = disX > delBtnWidth / 2 ? this.transformX(delBtnWidth) : ""
      } else {
        // console.log("上下")
      }
      //如果距离小于删除按钮的1/2，不显示删除按钮
      // let txtStyle = disX > delBtnWidth / 2 || disY < disX ? vm.transformX(delBtnWidth) : vm.transformX(0)

      list[shopindex].GrabAttrs[index].txtStyle = txtStyle
        //更新列表的状态
      vm.setData({
        list: list
      });
    }
  },
  /**
   * 重置其他样式
   * 
   * @param {any} list 
   * @param {any} index 
   * @returns 
   */
  resetOtherSty(list, index) {

    let len = list.length

    for (var i = 0; i < len; i++) {
      let item = list[i]
      if (i != index) {
        item.txtStyle = ''
      }
    }
    return list
  }
}