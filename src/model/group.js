import {
  Promise,
} from '../libs/es6-promise'
import HTTP from '../util/http'
import CONFIG from '../config'


export default {
  /**
   * Store a newly created resource in storage
   * @returns
   */
  store(obj) {
    return new Promise((resolve) => {
      const url = `${CONFIG.ApiHost}api/group`

      const group = HTTP.post(url, obj)

      group.then((res) => {
        console.log(`me++${res}`)
        resolve(res)
      })

      group.catch((err) => {
        console.log(`me++${err}`)
        resolve(false)
      })
    })
  },
}