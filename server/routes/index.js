/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:19:44
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 09:52:11
 * @Description: 
 * @FilePath: \castle-chart\server\routes\index.js
 */
const express = require("express");

const router = express.Router();
const business = require("./bussiness");

// 用 router 代替 app 进行路由配置
router
.post('/user/regiser',business.userRegister)
.post('/user/login',business.userLogin)
.post('/user/logout',business.userLogout)
// .post('/user/delete-user')
// .post('/user/set-info')
// .get('/user/get-info')
.post('/table/new-one',business.newTable)
// .post('/table/set-one')
.get('/table/get-list',business.getTableList)
.get('/table/get-one',business.getTable)
.get('/table/delete-one',business.deleteTable)

module.exports = router;

