const express = require("express");

const router = express.Router();
const business = require("./bussiness");

// 用 router 代替 app 进行路由配置
router
.post('/sample/new-one',business.newSample)
.post('/sample/set-one',business.setSample)
.post('/sample/delete-one',business.deleteSample)
.post('/sample/get-default',business.getSampleListDefault)
.post('/sample/get-list',business.getSampleList)
.post('/admin/check', business.checkAdmin)
.post('/chart/get-img', business.getChartImg)
.post('/panel/get-img', business.getPanelImg)
.post('/test',business.test)
.post('/user/regiser',business.userRegister)
.post('/user/login',business.userLogin)
.post('/user/login-check',business.checkLogin)
.post('/user/logout',business.userLogout)
// .post('/user/delete-user')
// .post('/user/set-info')
// .post('/user/get-info')
.post('/table/new-one',business.newTable)
.post('/table/set-one',business.setTable)
.post('/table/get-list',business.getTableList)
.post('/table/get-one',business.getTable)
.post('/table/delete-one',business.deleteTable)

.post('/chart/new-one',business.newChart)
.post('/chart/set-one',business.setChart)
.post('/chart/get-list',business.getChartList)
.post('/chart/get-one',business.getChart)
.post('/chart/delete-one',business.deleteChart)

.post('/panel/new-one',business.newPanel)
.post('/panel/set-one',business.setPanel)
.post('/panel/get-list',business.getPanelList)
.post('/panel/get-one',business.getPanel)
.post('/panel/delete-one',business.deletePanel)

.post('/chart/get-shared',business.getSharedChart)
.post('/panel/get-shared',business.getSharedPanel)

module.exports = router;

