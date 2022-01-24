/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:19:52
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-25 04:01:14
 * @Description:
 */
const database = require('../models/database')
const ObjectId = require('mongodb').ObjectId

function Message(success, code, info) {
  this.success = success
  this.code = code
  this.info = info
}
function endText(res, message, funcName) {
  if (funcName) {
    console.log(`${funcName} 返回:`, message)
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(JSON.stringify(message))
}
function receive(req, callback, funcName) {
  let datas = ''
  req.on('data', (data) => {
    datas += data
  })
  req.on('end', () => {
    let obj = JSON.parse(datas)
    if (funcName) {
      console.log(`${funcName} 接收:`, obj)
    }
    callback(obj)
  })
}
function loginInfo(req) {
  return req.session.sevalue
}

function userRegister(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('user', { username: obj.username }, (docs) => {
        if (docs.length === 0) {
          database.insertDoc('user', { username: obj.username, password: obj.password }, (result) => {
            req.session.sevalue = { id: result.insertedId, username: obj.username, password: obj.password }
            endText(res, new Message(true, 10, '用户注册成功'), 'userRegister')
          })
        } else {
          endText(res, new Message(false, 40, '用户名重复'), 'userRegister')
        }
      })
    },
    'userRegister'
  )
}
function userLogin(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('user', { username: obj.username }, (docs) => {
        let message
        if (docs.length === 0) {
          message = new Message(false, 40, '用户名不存在')
        } else if (docs[0].password == obj.password) {
          req.session.sevalue = { id: docs[0]._id, username: obj.username, password: obj.password }
          message = new Message(true, 10, '用户登录成功')
        } else {
          message = new Message(false, 41, '密码错误')
        }
        endText(res, message, 'userLogin')
      })
    },
    'userLogin'
  )
}
function userLoginCheck(req, res) {
  if (loginInfo(req)) {
    endText(res, new Message(true, 10, { username: loginInfo(req).username }), 'userLoginCheck')
  } else {
    endText(res, new Message(false, 40, undefined), 'userLoginCheck')
  }
}
function userLogout(req, res) {
  // 退出登录，重置 session，回到登录页面
  req.session.sevalue = undefined
  endText(res, new Message(true, 10, '退出登录成功'), 'userLogout')
}

function newTable(req, res) {
  receive(
    req,
    (obj) => {
      database.insertDoc('table', { ownerId: loginInfo(req).id, name: obj.name, data: obj.data }, (result) => {
        endText(res, new Message(true, 10, result.insertedId), 'newTable')
      })
    },
    'newTable'
  )
}
function newChart(req, res) {
  receive(
    req,
    (obj) => {
      database.insertDoc('chart', { ownerId: loginInfo(req).id, name: obj.name, data: obj.data }, (result) => {
        endText(res, new Message(true, 10, result.insertedId), 'newChart')
      })
    },
    'newChart'
  )
}
function newPanel(req, res) {
  receive(
    req,
    (obj) => {
      database.insertDoc('panel', { ownerId: loginInfo(req).id, name: obj.name, back: obj.back,layout:obj.layout }, (result) => {
        endText(res, new Message(true, 10, result.insertedId), 'newPanel')
      })
    },
    'newPanel'
  )
}

function getTable(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('table', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 10, '数据源不存在'), 'getTable')
        } else {
          endText(res, new Message(true, 10, docs[0]), 'getTable')
        }
      })
    },
    'getTable'
  )
}
function getChart(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('chart', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 10, '图表不存在'), 'getChart')
        } else {
          endText(res, new Message(true, 10, docs[0]), 'getChart')
        }
      })
    },
    'getChart'
  )
}
function getPanel(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('panel', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 10, '仪表板不存在'), 'getPanel')
        } else {
          endText(res, new Message(true, 10, docs[0]), 'getPanel')
        }
      })
    },
    'getPanel'
  )
}

function setTable(req, res) {
  receive(
    req,
    (obj) => {
      let newObj = {}
      if (obj.name) {
        newObj.name = obj.name
      }
      if (obj.data) {
        newObj.data = obj.data
      }
      database.updateDoc('table', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, newObj, (result) => {
        endText(res, new Message(true, 10, '更新数据源成功'), 'setTable')
      })
    },
    'setTable'
  )
}
function setChart(req, res) {
  receive(
    req,
    (obj) => {
      let newObj = {}
      if (obj.name) {
        newObj.name = obj.name
      }
      if (obj.data) {
        newObj.data = obj.data
      }
      if (obj.option) {
        newObj.option = obj.option
      }
      database.updateDoc('chart', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, newObj, (result) => {
        endText(res, new Message(true, 10, '更新图表成功'), 'setChart')
      })
    },
    'setChart'
  )
}
function setPanel(req, res) {
  receive(
    req,
    (obj) => {
      let newObj = {}
      if (obj.name) {
        newObj.name = obj.name
      }
      if (obj.back) {
        newObj.back = obj.back
      }
      if (obj.layout) {
        newObj.layout = obj.layout
      }
      database.updateDoc('panel', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, newObj, (result) => {
        endText(res, new Message(true, 10, '更新仪表板成功'), 'setPanel')
      })
    },
    'setPanel'
  )
}

function deleteTable(req, res) {
  receive(
    req,
    (obj) => {
      database.deleteDoc('table', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (result) => {
        endText(res, new Message(true, 10, '删除数据源成功'), 'deleteTable')
      })
    },
    'deleteTable'
  )
}
function deleteChart(req, res) {
  receive(
    req,
    (obj) => {
      database.deleteDoc('chart', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (result) => {
        endText(res, new Message(true, 10, '删除图表成功'), 'deleteChart')
      })
    },
    'deleteChart'
  )
}
function deletePanel(req, res) {
  receive(
    req,
    (obj) => {
      database.deleteDoc('panel', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (result) => {
        endText(res, new Message(true, 10, '删除仪表板成功'), 'deletePanel')
      })
    },
    'deletePanel'
  )
}

function getTableList(req, res) {
  database.findDoc('table', { ownerId: loginInfo(req).id }, (docs) => {
    endText(res, new Message(true, 10, docs), 'getTableList')
  })
}
function getChartList(req, res) {
  database.findDoc('chart', { ownerId: loginInfo(req).id }, (docs) => {
    endText(res, new Message(true, 10, docs), 'getChartList')
  })
}
function getPanelList(req, res) {
  database.findDoc('panel', { ownerId: loginInfo(req).id }, (docs) => {
    endText(res, new Message(true, 10, docs), 'getPanelList')
  })
}

function test(req, res) {
  console.log('testing')
  database.findDoc('table', { _id: new ObjectId('61ee7bee2edf8c6a4ee364ca') }, (docs) => {
    console.log()
    if (docs.length === 0) {
      endText(res, new Message(false, 10, '数据源不存在'), 'getTable')
    } else {
      endText(res, new Message(true, 10, docs), 'getTable')
    }
  })
}

module.exports = { test, deletePanel, getPanelList, setPanel, getPanel, newPanel, deleteChart, getChartList, setChart, getChart, newChart, setTable, userRegister, userLogin, userLoginCheck, userLogout, newTable, getTable, getTableList, deleteTable }
