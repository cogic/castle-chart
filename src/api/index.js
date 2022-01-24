/**
 * @Author: Cogic
 * @Date: 2021-12-21 21:44:00
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-25 01:54:18
 * @Description:
 */
import Network from '@/api/network'

// 如果需要不依赖 server 运行，则取消下面两行的注释，并注释掉最后一行的 export default
// import offline from '@/api/offline'
// export default offline

const showLog = false

function aLog(receive, back) {
  if (showLog) {
    console.log('收到: ', receive, ' 返回: ', back)
  }
}
function netPost(url, data, callback) {
  if (data) {
    Network.post(url, { data }).then((result) => {
      aLog(data, result.data)
      callback(result.data)
    })
  } else {
    Network.post(url).then((result) => {
      aLog(data, result.data)
      callback(result.data)
    })
  }
}

function userRegister(data, callback) {
  netPost('/user/regiser', data, callback)
}
function userLogin(data, callback) {
  netPost('/user/login', data, callback)
}
function checkLogin(callback) {
  netPost('/user/login-check', undefined, callback)
}
function userLogout(callback) {
  netPost('/user/logout', undefined, callback)
}

function newTable(data, callback) {
  netPost('/table/new-one', data, callback)
}
function newChart(data, callback) {
  netPost('/chart/new-one', data, callback)
}
function newPanel(data, callback) {
  netPost('/panel/new-one', data, callback)
}

function getTableList(callback) {
  netPost('/table/get-list', undefined, callback)
}
function getChartList(callback) {
  netPost('/chart/get-list', undefined, callback)
}
function getPanelList(callback) {
  netPost('/panel/get-list', undefined, callback)
}

function getTable(data, callback) {
  // if (data === 'builddata') {
  //   let result
  //   result.fileData.id = 'builddata'
  //   result.fileData.name = '新建数据源'
  //   result.fileData.data = []

  // } else {
    netPost('/table/get-one', data, callback)
  // }
}
function getChart(data, callback) {
  console.log(data);
  netPost('/chart/get-one', data, callback)
}
function getPanel(data, callback) {
  netPost('/panel/get-one', data, callback)
}

function deleteTable(data, callback) {
  netPost('/table/delete-one', data, callback)
}
function deleteChart(data, callback) {
  netPost('/chart/delete-one', data, callback)
}
function deletePanel(data, callback) {
  netPost('/panel/delete-one', data, callback)
}

function saveTable(data, callback) {
  netPost('/table/set-one', data, callback)
}
function saveChart(data, callback) {
  netPost('/chart/set-one', data, callback)
}
function savePanel(data, callback) {
  netPost('/panel/set-one', data, callback)
}

function getChartExamples(callback) {
  Network.get('/data/chartSamples.json', { baseURL: '/' }).then((result) => {
    aLog('返回', result.data)
    callback(result.data)
  })
}

export default { savePanel, saveChart, saveTable, userRegister, userLogin, checkLogin, userLogout, newPanel, newChart, newTable, getTableList, getTable, deletePanel, deleteChart, deleteTable, getChartList, getChart, getChartExamples, getPanelList, getPanel }
