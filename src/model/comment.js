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
      const url = `${CONFIG.ApiHost}api/comment`

      const resData = HTTP.post(url, obj)

      resData.then((res) => {
        console.log(`store++${res}`)
        resolve(res)
      })

      resData.catch((err) => {
        console.log(`store++${err}`)
        resolve(false)
      })
    })
  },
  /**
   * Display the specified resource.
   * @param {any} id
   * @returns
   */
  show(id) {
    return new Promise((resolve) => {
      const url = `${CONFIG.ApiHost}api/comment/${id}`

      const resData = HTTP.get(url)

      resData.then((res) => {
        console.log(`show++${res}`)
        resolve(res)
      })

      resData.catch((err) => {
        console.log(`show++${err}`)
        resolve(false)
      })
    })
  },
}