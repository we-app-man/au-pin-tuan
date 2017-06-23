import { Promise } from '../libs/es6-promise'
import regeneratorRuntime from '../libs/runtime'
import co from '../libs/co'
import API from '../util/api'
import DA from '../util/da'
import LANG from '../lang/lang'
import STORAGE from '../util/storage'
// model
import LOGIN from '../model/login'
import CART from '../model/cart'
import PRODUCT from '../model/product'
import CATELOG from '../model/catelog'
// route
import ROUTE from '../route'
// ab
import ABCART from '../abprocess/cart'
// mwx
import SYSTEM from '../mwx/systeminfo'
// roter


export default {
  transformX(num) {
    return `transform: translate(-${num}px, 0);`
  },


  /**
   * 购物车重新添加商品
   *
   */

  reAdd(page, event) {
    const vm = page
    const _this = this
    const idata = event.currentTarget.dataset
    const product = idata.item
    co(function* generator() {
      let removeCart = yield CART.Remove(product.Id)
      let addCart = yield _this.addCart(vm, product)
      _this.init(vm)

    })
  },
  /**
   * 添加到购物车
   *
   * @param {any} page
   * @param {any} product
   */
  addCart(page, product) {
    let vm = page
    let _this = this

    return new Promise((resolve, reject) => {
      co(function*() {

        API.toastLoading(vm)
        let Url = product.Url
        let shoppingProduct = yield PRODUCT.Crawl(Url)

        if (!API.resData(vm, shoppingProduct)) {
          resolve(false)
          return
        }
        let quantity = shoppingProduct.Data.Quantity
        if (product.SkuId !== "" && shoppingProduct.Data.Skus && shoppingProduct.Data.Skus.length > 0) {
          let skuShopping = shoppingProduct.Data.Skus.find(item => item.SkuId === product.SkuId)
          if (skuShopping) quantity = skuShopping.Quantity
        }
        if (quantity <= 0) {
          vm.wetoast.toast()
          API.toastTitle(vm, LANG.NoQulity)
            // return;
        }
        let reAddShopping = Object.assign({}, product)
        reAddShopping.Quantity = quantity > reAddShopping.Quantity ? reAddShopping.Quantity : quantity
        reAddShopping.Id = 0

        let ApiAddCart = yield CART.Modify(reAddShopping)

        if (ApiAddCart.Success) {
          vm.wetoast.toast()
          API.toastTitle(vm, LANG.ReAddSucess)
        } else {
          API.toastTitle(vm, LANG.LoadFail)
        }

        resolve(true)

      })
    })
  },
  /**
   * 删除购物车商品
   * 
   * @param {any} page 
   * @param {any} event 
   */
  delProduct(page, event) {
    let vm = page
    let index = event.currentTarget.dataset.index
    let pindex = event.currentTarget.dataset.pindex
    let list = vm.data.list
    let shop = list[pindex]
    let product = shop['GrabAttrs'][index]
    let _this = this
    let txtStyle = ""
    wx.showModal({
      title: LANG.delProductTitle,
      content: LANG.delProductMes,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          co(function*() {
            let removeCart = yield CART.Remove(product.Id)
            _this.list(vm)
          })

        } else {
          txtStyle = _this.transformX(0)
          product.txtStyle = txtStyle
          shop['GrabAttrs'].splice(index, 1, product)
          list.splice(pindex, 1, shop)
          vm.setData({
            list: list
          })
        }
      }
    })
  },
  /**
   * 购物车商品列表
   * 
   * @param {any} page 
   */
  list(page) {
    let vm = page
    let _this = this

    co(function* generator() {
      let webSites = vm.data.webSites
      let countries = vm.data.countries
      let serviceInfo = vm.data.serviceInfo

      let mCart = yield CART.List()

      if (!API.resData(vm, mCart)) {
        return
      }

      mCart = mCart.List

      vm.wetoast.toast()

      _this.cartEmpty(mCart, vm) // 判断购物车是否为空

      let list = ABCART.List(mCart, webSites, countries, serviceInfo.Data)
      console.log(list)
      vm.setData({
        'list': list,
        'initOk': true,
        'countries': countries,
        'webSites': webSites,
        'serviceInfo': serviceInfo,
        selAll: true,
      })
      _this.getCost(vm)
    })
  },

  /**
   * 判断购物车是否为空
   *
   */
  cartEmpty(mCart, vm) {
    if (mCart.length === 0) {
      vm.setData({
        'emptyShow': true,
        'errorMsg': LANG.ShoppingCartIsEmpty,
        'emptyBtn': LANG.LinkToScanCode,
      })
    }
  },
  /**
   * 统计计算
   *
   * @param {any} page 
   */
  getCost(page) {
    let vm = page
    let list = vm.data.list
    let AfterExpressFee = ABCART.AfterExpressFee(list)
    vm.setData({
      list: AfterExpressFee
    })
    let canPayList = AfterExpressFee.filter(val => {
      return (val.status !== "outtime" && val.status !== "minorderprice")
    })
    console.log("canPayList")
    console.log(canPayList)

    let obj = ABCART.AllPrice(canPayList)

    vm.setData({
      cart: obj.cart,
      // selAll: obj.selAll,
      cost: obj.price,
      costFixTwoNum: DA.fixTwoNum(obj.price)
    })
  },
  /**
   * 购物车商品添加到订单
   * 
   * @param {any} page 
   */
  addOrder(page) {
    let vm = page
    let _this = this
    let cart = vm.data.cart

    let list = vm.data.list

    let canNotPayShopArr = _this.minimumShops(list) // 从list中找出凑单低于限度的
    console.log("凑单未满")
    console.log(canNotPayShopArr)
      // debugger

    if (canNotPayShopArr.length > 0) {
      let canNotPayShop = canNotPayShopArr[0]
      let tips = `${canNotPayShop.Title}${LANG.ShoppingMoreThan}${canNotPayShop.minimumOrderPrice}${canNotPayShop.expressCurrencySign}${LANG.ShoppingWorse}${canNotPayShop.balance}${canNotPayShop.expressCurrencySign}${LANG.CanOrder}`
      wx.showModal({
        title: LANG.delProductTitle,
        showCancel: false,
        content: tips,
        success: function(res) {
          if (res.confirm) {

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }

    if (vm.data.cost <= 0) {
      vm.saveHide(false)
      setTimeout(function() {
        vm.saveHide(true)
      }, 1000)
      return
    }

    co(function*() {
      let removeChangeCompanyDetail = yield STORAGE.remove(STORAGE.changeCompanyDetail)
      STORAGE.remove(STORAGE.detailCompany)
      STORAGE.set(STORAGE.cart, cart)
      _this.goPay()
    })

  },
  goPay() {
    API.navTo(ROUTE.transport)
  },
  /**
   * 设置高度
   * 
   * @param {any} event 
   */
  setHeightAuto(page, event) {
    let vm = page
    let _index = API.event(event, 'index')
    let _pindex = API.event(event, 'pindex')
    let list = vm.data.list
    let autoHeight = list[_pindex]['GrabAttrs'][_index].autoHeight
    autoHeight = autoHeight === "auto" ? '' : "auto"
    list[_pindex]['GrabAttrs'][_index].autoHeight = autoHeight
    vm.setData({
      list: list
    })
  },
  /**
   * 全选
   * 
   * @param {any} page 
   */
  allSel(page) {
    let vm = page
    let _this = this
    let data = vm.data
    let bool = data.selAll
    let oldlist = data.list
    let webSites = data.webSites
    let countries = data.countries
    let serviceInfo = data.serviceInfo
    console.log("Allsel")
    console.log(bool)
      // debugger

    let list = ABCART.List(oldlist, webSites, countries, serviceInfo.Data, !bool)
    vm.setData({
      selAll: !bool,
      'list': list
    })

    _this.getCost(vm)

  },
  /**
   * 单击选择
   * 
   * @param {any} page 
   * @param {any} event 
   * @returns 
   */
  tabSel(page, event) {
    let vm = page
    let _this = this
    let _index = API.event(event, 'index')
    let _pindex = API.event(event, 'pindex')
    let list = vm.data.list
    let shop = list[_pindex]
    let selAll = true
    let productStatus = list[_pindex]['GrabAttrs'][_index].status
    if (productStatus === 'outtime' || productStatus === 'minorderprice') {
      return;
    }

    shop['GrabAttrs'][_index].status = !productStatus
    shop.status = list[_pindex]['GrabAttrs'].every(val => val.status === true)
    selAll = list.every(val => {
      return val.status === true
    })
    let someSel = list.some(val => {
      return val.status === true
    })

    // _this.ShopCanpayStatus(shop)

    console.log(list)
    vm.setData({
      'selAll': selAll,
      'list': list,
    })

    _this.getCost(vm)
  },

  /**
   * 凑单商品 低于设置的价格时不能提交
   * 
   * @param {any} list 
   * @returns 
   */
  minimumShops(list) {
    let newArr = []
    let len = list.length
    let i
    for (i = 0; i < len; i += 1) {
      let shop = list[i]
      let products = shop['GrabAttrs']
      let minimumOrderPrice = shop.minimumOrderPrice

      let hasSel = shop['GrabAttrs'].some(val => {
        return val.status === true
      })

      if (hasSel) {
        let seledProducts = products.filter(p => {
          return p.status === true
        })
        let seledProductPrcie = seledProducts.map((p) => p.OriginalPrice * p.Quantity).reduce((x, y) => {
          return x + y
        }, 0)
        if (seledProductPrcie < minimumOrderPrice) {
          shop.balance = DA.toFloatFixed((minimumOrderPrice - seledProductPrcie), 2)
          newArr.push(shop)
        }
      }

    }
    return newArr

  },
  //删除item
  delItem(page, e) {
    let vm = page
    let dataId = e.target.dataset.id;
    console.log("删除" + dataId);
    let cardTeams = vm.data.cardTeams;
    let newCardTeams = [];
    for (var i in cardTeams) {
      let item = cardTeams[i];
      if (item.id != dataId) {
        newCardTeams.push(item);
      }
    }
    vm.setData({
      cardTeams: newCardTeams
    });
  },

  toggleShopSel(page, event) {
    const vm = page
    const _this = this
    const list = vm.data.list
    let selAll = true
    const _pindex = API.event(event, 'pindex')
    let shop = list[_pindex]
    const shopStatus = shop.status
    console.log('toggleShopSel shopStatus')
    console.log(shopStatus)
    if (shopStatus === 'outtime' || shopStatus === 'minorderprice') {
      return
    }
    list[_pindex].status = !shopStatus
    list[_pindex]['GrabAttrs'].forEach((val) => {
      if (val.status !== 'outtime') {
        val.status = !shopStatus
      }

    })
    selAll = list.every(val => {
      return val.status === true
    })


    console.log(list)
    vm.setData({
      'selAll': selAll,
      'list': list,
    })
    _this.getCost(vm)
  },
  /**
   * 跳转到商品详情
   * 
   */
  toProductDetail(page, event) {
    let vm = page
    let index = event.currentTarget.dataset.index
    let pindex = event.currentTarget.dataset.pindex
    let product = vm.data.list[pindex]['GrabAttrs'][index]
    let Url = product.Url

    API.navTo(`../scanCode/detail/detail?code=${Url}`)
  },
  /**
   * 页面初始化
   * 
   * @param {any} page 
   */
  init(page) {
    let vm = page
    let _this = this

    co(function*() {
      API.toastLoading(vm)
      let systeminfo = yield SYSTEM.getSystemInfo()

      vm.setData({
        listViewHeight: systeminfo.windowHeight - 60
      });

      let loginRes = yield LOGIN.LOGINAll()
      if (!API.resData(vm, loginRes)) {
        vm.wetoast.toast()
        return
      }

      let webSites = yield CATELOG.Websites()
      let countries = yield CATELOG.Countries()
      let serviceInfo = yield CATELOG.ServiceInfo()

      // 存储
      API.App.webSitesRate = DA.deepCopy(webSites)
      API.App.countriesRate = DA.deepCopy(countries)
      API.App.serviceInfo = DA.deepCopy(serviceInfo)

      vm.setData({
        webSites: webSites,
        countries: countries,
        serviceInfo: serviceInfo,

      })

      _this.initStatus(vm)
      _this.list(vm)
    })

  },
  /**
   * 初始状态
   */
  initStatus(page) {
    page.setData({
      error: false
    })
  },
  /**
   * 错误渲染
   * 
   * @param {string} [title='']
   */
  errorReader(page, title = '') {
    page.setData({
      error: true,
      errorMsg: title
    })
  },
  /**
   * 导航
   * 
   */
  emptyNavigator() {
    wx.switchTab({
      url: ROUTE.scanCode
    })
  },
}