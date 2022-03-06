/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:18:57
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-01 09:40:39
 * @Description: 
 */
const express = require('express')
const cookieSession = require('cookie-session')
const process = require('process')

const router = require('./routes')
const app = express()
const port = 3030

process.on('uncaughtException',(err,origin)=>{
  // FIXME 此为偷懒的做法，实则应该预见可能报错的代码，对其进行异常捕获等
  // 用于防止 node 进程因为报错而退出
  console.log('Error ', err);
  console.log('Origin ', origin);
})

// 用于登录的 session
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
)

// express 托管静态资源
// app.use(express.static('public'))

// 设置 router
app.use(router).listen(port, () => {
  // console.clear()
  console.log('服务运行于localhost:' + port)
})
