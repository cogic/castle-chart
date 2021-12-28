/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:19:44
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-28 01:38:46
 * @Description: 
 */
const express = require("express");

const router = express.Router();
const business = require("./bussiness");

// 用 router 代替 app 进行路由配置
router
.post('/user/regiser',business.userRegister)
.post('/user/login',business.userLogin)
.post('/user/login-check',business.userLoginCheck)
.post('/user/logout',business.userLogout)
// .post('/user/delete-user')
// .post('/user/set-info')
// .post('/user/get-info')
.post('/table/new-one',business.newTable)
// .post('/table/set-one')
.post('/table/get-list',business.getTableList)
.post('/table/get-one',business.getTable)
.post('/table/delete-one',business.deleteTable)

module.exports = router;

