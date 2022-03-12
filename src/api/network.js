/**
 * @Author: Cogic
 * @Date: 2021-12-21 21:44:00
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-12 01:25:12
 * @Description:
 */
import axios from 'axios'

// const baseURL = '//localhost:3030/'
const baseURL = '/api' // baseURL 取在 vue.congfig.js 中的配置名，以解决跨域问题

/**
 * @description:
 * @param {string} method
 * @param {string} url
 * @param {*} config
 * @return {*}
 * @author: Cogic
 */
function request(method, url, config = {}) {
  const instance = axios.create({
    baseURL,
    method,
    timeout: 10000,
  })
  config.url = url // url 需要放 config 里，放在上面的 create() 中则无效，原因不明确
  // 添加请求拦截器
  // instance.interceptors.request.use(
  //   (config) => {
  //     return config
  //   },
  //   (error) => {
  //     return Promise.reject(error)
  //   }
  // )

  // 添加响应拦截器
  // instance.interceptors.response.use(
  //   (response) => {
  //     return response
  //   },
  //   (error) => {
  //     return Promise.reject(error)
  //   }
  // )

  return instance.request(config)
}

/**
 * @description:
 * @param {string} url
 * @param {*} config
 * @return {*}
 * @author: Cogic
 */
function get(url, config = {}) {
  return request('get', url, config)
}

/**
 * @description:
 * @param {string} url
 * @param {*} config
 * @return {*}
 * @author: Cogic
 */
function post(url, config = {}) {
  return request('post', url, config)
}

export default { request, get, post }
