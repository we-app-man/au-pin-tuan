import timeago from '../libs/timeago'
import Print from '../fn/print'

export default {
  format(timeStr) {
    const date = new Date()
    const gmtTimes = date.getTimezoneOffset() * 60 * 1000
    const utcTime = new Date(timeStr)

    try {
      timeago().format('2017-7-2')
    } catch (error) {
      Print.Error(error)
    }

    return timeago().format(utcTime.getTime() + gmtTimes)
  },
}