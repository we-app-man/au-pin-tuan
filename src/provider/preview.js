// stack
import Stack from '../mwx/stack'
// image
import Image from '../mwx/image'

export default {
  /**
   * 预览头像
   */
  avatar() {
    const vm = Stack.page()
    
    const avatar = vm.data.group.avatar
    Image.previewImage(avatar, [avatar])
  },
}