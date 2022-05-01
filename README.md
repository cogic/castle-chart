# CastleChart
2022 年本科毕业设计项目
## 简介
数据可视化搭建平台，主要使用 Vue3 + NodeJS + MongoDB 完成

## 项目启动
### 前端
```
npm install
npm run serve
```

### 后端（后端代码位于server文件夹中）
```
cd server
npm install
npm start
```

### 数据库
需要手动打开MongoDB服务并创建基础数据库`castlechart`，然后导入基础collection

数据库的三个基础 collection 暂存于 public/database-collection 中，后续将添加脚本以快速建立数据库


## 使用
普通用户直接注册登录。
管理员用户名snow、密码10086，登录后点击左上角平台Logo进入管理员界面。


## 界面展示

![](README.assets/登录.png)

![](README.assets/首页.png)

![](README.assets/仪表板.png)

![](README.assets/图表编辑.png)

![](README.assets/数据源编辑.png)

![](README.assets/仪表板编辑.png)

![](README.assets/模板中心.png)

