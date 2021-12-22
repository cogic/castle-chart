/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:18:57
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 01:49:02
 * @Description: 
 * @FilePath: \castle-chart\server\app.js
 */
const express = require('express')
// const cookieSession = require('cookie-session')

const router = require('./routes')
const app = express()
const port = 3030

// 用于登录的 session
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//   })
// )

// express 托管静态资源
// app.use(express.static('public'))

// 设置 router
app.use(router).listen(port, () => {
  // console.clear()
  console.log('服务运行于localhost:' + port)
})
