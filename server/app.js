const express = require('express')
const cookieSession = require('cookie-session')
const process = require('process')

// const hostname = require('./host').hostname
const router = require('./routes')
const app = express()
const port = 3030

process.on('uncaughtException', (err, origin) => {
  // FIXME 此为偷懒的做法，实则应该预见可能报错的代码，对其进行异常捕获等
  // 用于防止 node 进程因为报错而退出
  console.log('Error ', err)
  console.log('Origin ', origin)
})

// 用于登录的 session
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 * 7,
  })
)

// express 托管静态资源
app.use(express.static('public'))

// 设置 router
app.use(router).listen(port, () => {
  console.log(`服务运行于 localhost:${port}`)
})
