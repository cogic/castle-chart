/**
 * @Author: Cogic
 * @Date: 2021-12-21 21:44:00
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-12 21:05:54
 * @Description:
 */
import Network from '@/api/network'
import AMapLoader from '@amap/amap-jsapi-loader'

// 如果需要不依赖 server 运行，则取消下面两行的注释，并注释掉最后一行的 export default
// import offline from '@/api/offline'
// export default offline

const showLog = true

function aLog(receive, back) {
  if (showLog) {
    if (receive && back) {
      console.log('收到: ', receive, ' 返回: ', back)
    } else if (receive) {
      console.log('收到: ', receive)
    } else if (back) {
      console.log('返回: ', back)
    }
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

function checkAdmin(callback) {
  netPost('/admin/check', undefined, callback)
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
  console.log('getTableListgetTableList')
  netPost('/table/get-list', undefined, callback)
}
function getChartList(callback) {
  console.log('getChartListgetChartList')
  netPost('/chart/get-list', undefined, callback)
}
function getPanelList(callback) {
  console.log('getPanelListgetPanelList')
  netPost('/panel/get-list', undefined, callback)
}

function getTable(data, callback) {
  netPost('/table/get-one', data, callback)
}
function getChart(data, callback) {
  netPost('/chart/get-one', data, callback)
}
function getPanel(data, callback) {
  netPost('/panel/get-one', data, callback)
}
function getSharedChart(data, callback) {
  netPost('/chart/get-shared', data, callback)
}
function getSharedPanel(data, callback) {
  netPost('/panel/get-shared', data, callback)
}
function getChartImg(data, callback) {
  netPost('/chart/get-img', data, callback)
}
function getPanelImg(data, callback) {
  netPost('/panel/get-img', data, callback)
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
    aLog(null, result.data)
    callback(result.data)
  })
}

function getGeoJson(adcode, callback) {
  AMapLoader.load({
    key: 'b2c9e324ab22fdad78f5fbbe76b0e410',
    version: '2.0',
    AMapUI: {
      version: '1.1',
      plugins: ['overlay/SimpleMarker'],
    },
  }).then((AMap) => {
    AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
      new DistrictExplorer().loadAreaNode(adcode, function (error, areaNode) {
        let subFeatures = areaNode.getSubFeatures()
        let geoJson = { type: 'FeatureCollection', features: subFeatures }
        aLog(adcode, geoJson)
        callback(geoJson)
      })
    })
  })
}

// function setSharedChart(data){
//   netPost('/chart/set-shared', data, callback)
// }
// function setSharedPanel(data){
//   netPost('/panel/set-shared', data, callback)
// }

export default {
  checkAdmin,
  getChartImg,
  getPanelImg,
  getSharedChart,
  getSharedPanel,
  getGeoJson,
  savePanel,
  saveChart,
  saveTable,
  userRegister,
  userLogin,
  checkLogin,
  userLogout,
  newPanel,
  newChart,
  newTable,
  getTableList,
  getTable,
  deletePanel,
  deleteChart,
  deleteTable,
  getChartList,
  getChart,
  getChartExamples,
  getPanelList,
  getPanel,
}
