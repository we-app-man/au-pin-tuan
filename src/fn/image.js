import Config from '../config'

export default {
  AddHost(arr) {
    const len = arr.length
    const fileHost = Config.FileHost
    console.log(arr)
    const arrNew = []
    let i
    for (i = 0; i < len; i += 1) {
      const item = arr[i]
      arrNew.push(fileHost + item)
    }

    return arrNew
  },
  imageList(arr) {
    const len = arr.length
    console.log(arr)
    const arrNew = []
    let i
    for (i = 0; i < len; i += 1) {
      const item = arr[i]
      const obj = {
        src: item,
      }
      arrNew.push(obj)
    }
    return arrNew
  },
}