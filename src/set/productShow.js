// stack
import Stack from '../mwx/stack'
// fn
import FnProduct from '../fn/product'
import FnString from '../fn/string'

export default {
  products(data) {
    const vm = Stack.page()
    const len = data.length
    const products = data
    let i

    for (i = 0; i < len; i += 1) {
      const item = products[i]
      item.amount = 0
    }

    vm.setData({
      products,
    })
  },
  productsIndex(bool, index) {
    const vm = Stack.page()
    const products = vm.data.products
    let amount = products[index].amount
    if (bool) {
      amount += 1
    } else {
      amount -= 1
    }

    if (amount < 0) {
      amount = 0
    }

    products[index].amount = amount

    let totalPrice = FnProduct.totalPrice(products)
    totalPrice = FnString.toDecimal2(totalPrice)

    vm.setData({ products, totalPrice })
  },
}