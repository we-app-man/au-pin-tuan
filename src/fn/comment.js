export default {
  recoverGroup(comments) {
    const len = comments.length
    let i
    const group = []
    for (i = 0; i < len; i += 1) {
      const item = comments[i]
      group.push(item.group)
    }
    return group
  },
}