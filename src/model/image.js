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
  store(filepath) {
    return new Promise((resolve) => {
      const url = `${CONFIG.ApiHost}api/image/upload`

      const resData = HTTP.file(url, filepath)

      resData.then((res) => {
        console.log(`store++${res}`)
        resolve(JSON.parse(res))
      })

      resData.catch((err) => {
        console.log(`store++${err}`)
        resolve(false)
      })
    })
  },
}