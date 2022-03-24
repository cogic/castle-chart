/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:19:52
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-14 11:39:53
 * @Description:
 */
const database = require('../models/database')
// const template = require('art-template')
const ObjectId = require('mongodb').ObjectId
const puppeteer = require('puppeteer')
// template.defaults.root = './'

function nowDate() {
  return new Date()
}
// async function getImg(url, callback) {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   // await page.setContent(htmlStr, { waitUntil: 'networkidle2' })
//   await page.goto(url, { waitUntil: 'networkidle2' })
//   await page.screenshot({ encoding:'base64', fullPage: true }).then((imgStr)=>{
//     callback(imgStr)
//     // callback(buffer.toString('base64'))
//   })
//   await browser.close()
// }
//  let browser
//  puppeteer.launch({
//    headless:true,
//    args: [
//        '–disable-gpu',
//        '–disable-dev-shm-usage',
//        '–disable-setuid-sandbox',
//        '–no-first-run',
//        '–no-sandbox',
//        '–no-zygote',
//        '–single-process'
//    ]
//  }).then((brs)=>{
//    browser = brs
//  })
async function getImg(url, path, callback) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  // let code = await page.screenshot({ path: path, quality: 10, fullPage: true, encoding: 'base64' })
  let code = await page.screenshot({quality: 10,type:'jpeg', fullPage: true, encoding: 'base64' })
  await callback('data:image/png;base64,' + code)
  await page.close()
  await browser.close()
}

function Message(success, code, info) {
  this.success = success
  this.code = code
  this.info = info
}
function endText(res, message, funcName) {
  if (funcName) {
    // console.log(`${funcName} 返回:`, message)
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


function newSample(req, res) {
  receive(
    req,
    (obj) => {
      database.insertDoc('sample', { creatorId: loginInfo(req).id,lastModifierId:loginInfo(req).id, name: obj.name,type:obj.type, tableData: obj.tableData,option:obj.option, imgSrc: obj.imgSrc, createTime: nowDate(), updateTime: nowDate() }, (result) => {
        endText(res, new Message(true, 10, result.insertedId), 'newSample')
      })
    },
    'newSample'
  )
}
function setSample(req, res) {
  receive(
    req,
    (obj) => {
      let newObj = { updateTime: nowDate() ,lastModifierId:loginInfo(req).id}
      if (obj.name) {
        newObj.name = obj.name
      }
      if (obj.tableData) {
        newObj.tableData = obj.tableData
      }
      if (obj.option) {
        newObj.option = obj.option
      }
      if (obj.imgSrc) {
        newObj.imgSrc = obj.imgSrc
      }
      if (obj.type) {
        newObj.type = obj.type
      }
      // getImg(obj.path + obj._id, 'public/img/panel' + obj._id + '.jpeg',(imgcode)=>{
      //   database.updateDoc('sample', { _id: new ObjectId(obj._id)}, { imgSrc: imgcode }, (result) => {
      //   })
      // })
      database.updateDoc('sample', { _id: new ObjectId(obj._id) }, newObj, (result) => {
        endText(res, new Message(true, 10, '更新Sample图表成功'), 'setSample')
      })
    },
    'setSample'
  )
}
function deleteSample(req, res) {
  receive(
    req,
    (obj) => {
      database.deleteDoc('sample', { _id: new ObjectId(obj._id)}, (result) => {
        endText(res, new Message(true, 10, '删除Sample图表成功'), 'deleteSample')
      })
    },
    'deleteSample'
  )
}
function getSampleListDefault(req, res) {
  database.findDoc('sample', {}, (docs) => {
    endText(res, new Message(true, 10, docs), 'getSampleListDefault')
  })
}
function getSampleList(req, res) {
  let sample = []
  database.findDoc('sample', { type: 'line' }, (docs) => {
    sample.push({ name: '折线图', examples: docs })
    database.findDoc('sample', { type: 'bar' }, (docs) => {
      sample.push({ name: '柱状图', examples: docs })
      database.findDoc('sample', { type: 'pie' }, (docs) => {
        sample.push({ name: '饼图', examples: docs })
        database.findDoc('sample', { type: 'gauge' }, (docs) => {
          sample.push({ name: '仪表盘', examples: docs })
          database.findDoc('sample', { type: 'scatter' }, (docs) => {
            sample.push({ name: '散点图', examples: docs })
            database.findDoc('sample', { type: 'funnel' }, (docs) => {
              sample.push({ name: '漏斗图', examples: docs })
              database.findDoc('sample', { type: 'map' }, (docs) => {
                sample.push({ name: '地图', examples: docs })
                endText(res, new Message(true, 10, sample), 'getSampleList')
              })
            })
          })
        })
      })
    })
  })
}

function checkAdmin(req, res) {
  if (loginInfo(req)) {
    database.findDoc('admin', { username: loginInfo(req).username }, (docs) => {
      if (docs.length !== 0) {
        endText(res, new Message(true, 10, { username: loginInfo(req).username }), 'checkAdmin')
      } else {
        endText(res, new Message(false, 41, '登录用户非管理员'), 'checkAdmin')
      }
    })
  } else {
    endText(res, new Message(false, 40, undefined), 'checkAdmin')
  }
}
function userRegister(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('user', { username: obj.username }, (docs) => {
        if (docs.length === 0) {
          database.insertDoc('user', { username: obj.username, password: obj.password, createTime: nowDate(), updateTime: nowDate() }, (result) => {
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
function checkLogin(req, res) {
  if (loginInfo(req)) {
    endText(res, new Message(true, 10, { username: loginInfo(req).username }), 'checkLogin')
  } else {
    endText(res, new Message(false, 40, undefined), 'checkLogin')
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
      database.insertDoc('table', { ownerId: loginInfo(req).id, name: obj.name, data: obj.data, imgSrc: obj.imgSrc, createTime: nowDate(), updateTime: nowDate() }, (result) => {
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
      database.insertDoc('chart', { ownerId: loginInfo(req).id, name: obj.name, data: obj.data, imgSrc: obj.imgSrc, createTime: nowDate(), updateTime: nowDate() }, (result) => {
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
      database.insertDoc('panel', { ownerId: loginInfo(req).id, name: obj.name, back: obj.back, layout: obj.layout, imgSrc: obj.imgSrc, createTime: nowDate(), updateTime: nowDate() }, (result) => {
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
          endText(res, new Message(false, 40, '数据源不存在'), 'getTable')
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
      // database.findDoc('chart', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
      database.findDoc('chart', { _id: new ObjectId(obj._id) }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 40, '图表不存在'), 'getChart')
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
      // database.findDoc('panel', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
      database.findDoc('panel', { _id: new ObjectId(obj._id) }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 40, '仪表板不存在'), 'getPanel')
        } else {
          endText(res, new Message(true, 10, docs[0]), 'getPanel')
        }
      })
    },
    'getPanel'
  )
}

function getChartImg(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('chart', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
        if (docs.length !== 0) {
          getImg(obj.path + obj._id, 'public/img/chart' + obj._id + '.jpeg', (imgcode) => {
            database.updateDoc('chart', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, { imgSrc: imgcode }, (result) => {
            })
          })
          endText(res, new Message(true, 10, { path: '//localhost:3030/img/' + 'chart' + obj._id + '.jpeg' }), 'getChartImg')
        } else {
          endText(res, new Message(false, 40, '图表不存在'), 'getChartImg')
        }
      })
    },
    'getChartImg'
  )
}
function getPanelImg(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('panel', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 40, '仪表板不存在'), 'getPanelImg')
        } else {
          getImg(obj.path + obj._id, 'public/img/panel' + obj._id + '.jpeg',(imgcode)=>{
            database.updateDoc('panel', { _id: new ObjectId(obj._id), ownerId: loginInfo(req).id }, { imgSrc: imgcode }, (result) => {
            })
          })
          endText(res, new Message(true, 10, { path: '//localhost:3030/img/' + 'panel' + obj._id + '.jpeg' }), 'getPanelImg')
        }
      })
    },
    'getPanelImg'
  )
}

function getSharedChart(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('chart', { _id: new ObjectId(obj._id), isShared: true }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 40, '图表不存在'), 'getSharedChart')
        } else {
          endText(res, new Message(true, 10, docs[0]), 'getSharedChart')
        }
      })
    },
    'getSharedChart'
  )
}
function getSharedPanel(req, res) {
  receive(
    req,
    (obj) => {
      database.findDoc('panel', { _id: new ObjectId(obj._id), isShared: true }, (docs) => {
        if (docs.length === 0) {
          endText(res, new Message(false, 40, '仪表板不存在'), 'getSharedPanel')
        } else {
          endText(res, new Message(true, 10, docs[0]), 'getSharedPanel')
        }
      })
    },
    'getSharedPanel'
  )
}

function setTable(req, res) {
  receive(
    req,
    (obj) => {
      let newObj = { updateTime: nowDate() }
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
      let newObj = { updateTime: nowDate() }
      if (obj.name) {
        newObj.name = obj.name
      }
      if (obj.data) {
        newObj.data = obj.data
      }
      if (obj.option) {
        newObj.option = obj.option
      }
      if (obj.imgSrc) {
        newObj.imgSrc = obj.imgSrc
      }
      if (obj.isShared != undefined) {
        newObj.isShared = obj.isShared
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
      let newObj = { updateTime: nowDate() }
      if (obj.name) {
        newObj.name = obj.name
      }
      if (obj.back) {
        newObj.back = obj.back
      }
      if (obj.layout) {
        newObj.layout = obj.layout
      }
      if (obj.imgSrc) {
        newObj.imgSrc = obj.imgSrc
      }
      if (obj.isShared != undefined) {
        newObj.isShared = obj.isShared
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
      endText(res, new Message(false, 40, '数据源不存在'), 'getTable')
    } else {
      endText(res, new Message(true, 10, docs), 'getTable')
    }
  })
}

module.exports = {
  newSample,
  setSample,
  deleteSample,
  getSampleListDefault,
  getSampleList,
  checkAdmin,
  getChartImg,
  getPanelImg,
  getSharedChart,
  getSharedPanel,
  test,
  deletePanel,
  getPanelList,
  setPanel,
  getPanel,
  newPanel,
  deleteChart,
  getChartList,
  setChart,
  getChart,
  newChart,
  setTable,
  userRegister,
  userLogin,
  checkLogin,
  userLogout,
  newTable,
  getTable,
  getTableList,
  deleteTable,
}
