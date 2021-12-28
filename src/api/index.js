/**
 * @Author: Cogic
 * @Date: 2021-12-21 21:44:00
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-29 00:55:13
 * @Description:
 */
import { post } from '@/api/network'

let testLogin = true

/**
 * @description: data: {username, password}
 * @param {*} data
 * @return {*}
 * @author: Cogic
 */
function userRegister(data) {
  testLogin = true
  return { success: true }
  // post('/user/regiser', { data }).then((res) => {})
}

/**
 * @description: data: {username, password}
 * @param {*} data
 * @return {*}
 * @author: Cogic
 */
function userLogin(data) {
  console.log('收到', data)
  let result = {
    success: false,
  }
  if (data.username === 'aaa' && data.password === 'aaa') {
    result.success = true
    testLogin = true
  }
  console.log('返回', result)
  return result
  // post('/user/login', { data }).then((res) => {})
}

function checkLogin() {
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
  console.log('返回', result)
  return result
}

/**
 * @description:
 * @return {*}
 * @author: Cogic
 */
function userLogout() {
  return true
  // post('/user/logout').then((res) => {})
}

/**
 * @description: data: {tabledata}
 * @param {*} data
 * @return {*}
 * @author: Cogic
 */
function newTable(data) {
  let result = {
    success: true,
  }
  console.log('收到', data)
  console.log('返回', result)
  return result
  // post('/table/new-one', { data }).then((res) => {})
}

/**
 * @description:
 * @return {*}
 * @author: Cogic
 */
function getTableList() {
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
  console.log('返回', result)
  return result
  // post('/table/get-list').then((res) => {})
}

/**
 * @description: data: {tablekey}
 * @param {*} data
 * @return {*}
 * @author: Cogic
 */
function getTable(data) {
  console.log('收到', data)
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
  console.log('返回', result)
  return result
  // post('/table/get-one', { data }).then((res) => {})
}

/**
 * @description: data: {tablekey}
 * @param {*} data
 * @return {*}
 * @author: Cogic
 */
function deleteTable(data) {
  return true
  // post('/table/delete-one', { data }).then((res) => {})
}

export default { userRegister, userLogin, checkLogin, userLogout, newTable, getTableList, getTable, deleteTable }
