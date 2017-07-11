export default {
  totalPrice(data) {
    const len = data.length
    let total = 0
    let i
    for (i = 0; i < len; i += 1) {
      const item = data[i]
      const price = item.price * item.amount
      total += price
    }
    return total
  },
  commentProduct(products) {
    const len = products.length
    let str = ''
    let i
    for (i = 0; i < len; i += 1) {
      const item = products[i]
      const itemStr = `${item.name} x ${item.amount}`

      str += `${itemStr}\n`
    }

    return str
  },
}