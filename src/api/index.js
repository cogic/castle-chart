/**
 * @Author: Cogic
 * @Date: 2021-12-21 21:44:00
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-21 21:00:28
 * @Description:
 */
import Network from '@/api/network'

const showLog = false
let testLogin = true

function aLog(...value) {
  if (showLog) {
    console.log(...value)
  }
}

function userRegister(data, callback) {
  testLogin = true
  callback({ success: true })
  // post('/user/regiser', { data }).then((res) => {})
}

function userLogin(data, callback) {
  aLog('收到', data)
  let result = {
    success: false,
  }
  if (data.username === 'aaa' && data.password === 'aaa') {
    result.success = true
    testLogin = true
  }
  aLog('返回', result)
  callback(result)
  // post('/user/login', { data }).then((res) => {})
}

function checkLogin(callback) {
  let result = {
    success: true,
    user: {},
  }
  if (testLogin) {
    result.user.name = 'WhiteInk'
    result.user.portrait = 'cat.png'
  } else {
    result.success = false
  }
  aLog('返回', result)
  callback(result)
}

function userLogout(callback) {
  callback(true)
  // post('/user/logout').then((res) => {})
}

function newTable(data, callback) {
  let result = {
    success: true,
  }
  aLog('收到', data)
  aLog('返回', result)
  callback(result)
  // post('/table/new-one', { data }).then((res) => {})
}

function getTableList(callback) {
  const result = {
    success: true,
    filesInfo: [
      {
        id: '111',
        name: '哈哈哈',
      },
      {
        id: '222',
        name: 'okokokok',
      },
      {
        id: '333',
        name: '大fewer微软士大夫士大夫大师傅现场v西安人也瑞特人',
      },
    ],
  }
  aLog('返回', result)
  callback(result)
  // post('/table/get-list').then((res) => {})
}

function getTable(data, callback) {
  aLog('收到', data)
  const result = {
    success: true,
    fileData: {
      id: '',
      name: '',
      data: [],
    },
  }
  if (data === '111') {
    result.fileData.id = '111'
    result.fileData.name = '哈哈哈'
    result.fileData.data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
  } else if (data === '222') {
    result.fileData.id = '222'
    result.fileData.name = 'okokokok'
    result.fileData.data = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i'],
    ]
  } else if (data === '333') {
    result.fileData.id = '333'
    result.fileData.name = '大fewer微软士大夫士大夫大师傅现场v西安人也瑞特人'
    result.fileData.data = [
      ['多少士大夫地方大师傅', '2', '3', '多少士大夫地方大师傅', '2', '3', '多少士大夫地方大师傅', '2', '3', '多少士大夫地方大师傅', '2', '3'],
      ['4', 'aaasdfsd5', '6'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道', '7', '8', '撒旦发射点知道', '7', '8', '撒旦发射点知道', '7', '8', '撒旦发射点知道', '7', '8', '撒旦发射点知道', '7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
      ['7', '8', '撒旦发射点知道'],
    ]
  } else if (data === 'builddata') {
    result.fileData.id = 'builddata'
    result.fileData.name = '新建数据源'
    result.fileData.data = []
  } else {
    result.success = false
  }
  aLog('返回', result)
  callback(result)
  // post('/table/get-one', { data }).then((res) => {})
}

function deleteTable(data, callback) {
  callback(true)
  // post('/table/delete-one', { data }).then((res) => {})
}

function getChartList(callback) {
  const result = {
    success: true,
    filesInfo: [
      {
        id: '999',
        name: 'eeeeeeeeeee',
      },
      {
        id: '888',
        name: '各个地方的法国队',
      },
      {
        id: '777',
        name: '嘎嘎嘎',
      },
    ],
  }
  aLog('返回', result)
  callback(result)
}

function getChart(data, callback) {
  aLog('收到', data)
  const result = {
    success: true,
    fileData: {
      id: '',
      name: '',
      data: [],
      option: {},
    },
  }
  if (data === '999') {
    result.fileData.id = '999'
    result.fileData.name = 'eeeeeeeeeee'
    result.fileData.data = [
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [150, 230, 224, 218, 135, 147, 260],
    ]
    result.fileData.option = {
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          seriesLayoutBy: 'row',
        },
      ],
    }
  } else if (data === '888') {
    result.fileData.id = '888'
    result.fileData.name = '各个地方的法国队'
    result.fileData.data = [
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [120, 200, 150, 80, 70, 110, 130],
    ]
    result.fileData.option = {
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          seriesLayoutBy: 'row',
        },
      ],
    }
  } else if (data === '777') {
    result.fileData.id = '777'
    result.fileData.name = '嘎嘎嘎'
    result.fileData.data = [
      [10.0, 8.04],
      [8.07, 6.95],
      [13.0, 7.58],
      [9.05, 8.81],
      [11.0, 8.33],
      [14.0, 7.66],
      [13.4, 6.81],
      [10.0, 6.33],
      [14.0, 8.96],
      [12.5, 6.82],
      [9.15, 7.2],
      [11.5, 7.2],
      [3.03, 4.23],
      [12.2, 7.83],
      [2.02, 4.47],
      [1.05, 3.33],
      [4.05, 4.96],
      [6.03, 7.24],
      [12.0, 6.26],
      [12.0, 8.84],
      [7.08, 5.82],
      [5.02, 5.68],
    ]
    result.fileData.option = {
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          type: 'scatter',
        },
      ],
    }
  } else if (data === 'buildchart') {
    result.fileData.id = 'buildchart'
    result.fileData.name = '新建图表'
    result.fileData.data = []
    result.fileData.option = {}
  } else {
    result.success = false
  }
  aLog('返回', result)
  callback(result)
}

function getChartExamples(callback) {
  Network.get('/data/chartSamples.json', { baseURL: '/' }).then((result) => {
    aLog('返回', result.data)
    callback(result.data)
  })
}

function getPanelList(callback) {
  const result = {
    success: true,
    filesInfo: [
      {
        id: '101',
        name: '高度发达',
      },
      {
        id: '102',
        name: '突突突',
      },
      {
        id: '103',
        name: '胜多负少',
      },
    ],
  }
  aLog('返回', result)
  callback(result)
}

function getPanel(data, callback) {
  aLog('收到', data)
  const result = {
    success: true,
    fileData: {
      id: '',
      name: '',
      layout: [],
      back: {},
    },
  }
  if (data === '101') {
    result.fileData.id = '101'
    result.fileData.name = '高度发达'
    result.fileData.layout = [
      {
        x: 0,
        y: 0,
        w: 5,
        h: 4,
        i: 0,
        type: 'text',
        config: {
          data: [
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            [150, 230, 224, 218, 135, 147, 260],
          ],
          option: {
            xAxis: {
              type: 'category',
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                type: 'line',
                seriesLayoutBy: 'row',
              },
            ],
          },
        },
      },
      {
        x: 5,
        y: 0,
        w: 5,
        h: 4,
        i: 1,
        type: 'chart',
        config: {},
      },
      {
        x: 10,
        y: 0,
        w: 5,
        h: 4,
        i: 2,
        type: 'text',
        config: { content: '这是一顶顶顶顶顶顶顶顶顶顶顶顶' },
      },
    ]
    result.fileData.back = {
      i: 'back',
      type: 'back',
      config: {},
    }
  } else if (data === '102') {
    result.fileData.id = '102'
    result.fileData.name = '突突突'
    result.fileData.layout = []
    result.fileData.back = {
      i: 'back',
      type: 'back',
      config: {},
    }
  } else if (data === '103') {
    result.fileData.id = '103'
    result.fileData.name = '胜多负少'
    result.fileData.layout = []
    result.fileData.back = {
      i: 'back',
      type: 'back',
      config: {},
    }
  } else if (data === 'buildpanel') {
    result.fileData.id = 'buildpanel'
    result.fileData.name = '新建仪表板'
    result.fileData.layout = []
    result.fileData.back = {
      i: 'back',
      type: 'back',
      config: {},
    }
  } else {
    result.success = false
  }
  aLog('返回', result)
  callback(result)
}

export default { userRegister, userLogin, checkLogin, userLogout, newTable, getTableList, getTable, deleteTable, getChartList, getChart, getChartExamples, getPanelList, getPanel }
