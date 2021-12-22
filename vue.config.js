/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:32:27
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 10:54:15
 * @Description: 
 * @FilePath: \castle-chart\vue.config.js
 */
module.exports = {
  devServer: {
    // open: true,
    // host: 'localhost',
    // port: 8080,
    // https: false, //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://localhost:3030/', // node 服务运行在的地址
        // ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '', //请求的时候前面（即baseURL）加上 api
        },
      },
    },
  },
  // configureWebpack: {
  //   resolve:{
  //     alias:{
  //       'components':'@/components'
  //     }
  //   }
  // },
  // chainWebpack:config => {
  //   config.resolve.alias
  //   .set('components','@/components')
  // }
}
