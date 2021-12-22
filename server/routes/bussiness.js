/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:19:52
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 11:24:59
 * @Description:
 * @FilePath: \castle-chart\server\routes\bussiness.js
 */
const database = require('../models/database')

function userRegister(req, res) {
  let datas = ''
  req.on('data', (data) => {
    datas += data
  })
  req.on('end', () => {
    let obj = JSON.parse(datas)
    console.log('服务器接收到:', obj)
    database.insertDoc('user', { username: obj.username, password: obj.password }, (result) => {
      console.log('从数据库取得:', result)
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('请求 /user/register 成功')
    })
  })
}

function userLogin(req, res) {
  // 验证登录
  let datas = ''
  req.on('data', (data) => {
    datas += data
  })
  req.on('end', () => {
    let obj = JSON.parse(datas)
    console.log('服务器接收到:', obj)
    // 数据库操作，验证用户名和密码
    database.findDoc('user', { username: obj.username }, (docs) => {
      console.log('从数据库取得:', docs)
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('请求 /user/login 成功')
    })
  })
}

function userLogout(req, res) {
  // 清 session
}

function newTable(req, res) {}

function getTable(req, res) {}

function getTableList(req, res) {}

function deleteTable(req, res) {}

module.exports = { userRegister, userLogin, userLogout, newTable, getTable, getTableList, deleteTable }
