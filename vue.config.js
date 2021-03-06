const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // 用于打包dist
  // assetsDir: 'static',
  // parallel: false,
  // publicPath: './',
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    // open: true,
    // host: 'localhost',
    // port: 8080,
    // https: false, //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://localhost:3030/', // node 服务运行在的地址
        // target: 'http://121.37.1.182:3030/', // node 服务运行在的地址
        // ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '', //请求的时候前面（即baseURL）加上 api
        },
      },
    },
  },
  // configureWebpack: {
  //   entry: {
  //     app: ['./node_modules/babel-polyfill/dist/polyfill.js', './src/main.js'],
  //   },
  // },
  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.vue$/,
  //         use: 'vue-loader',
  //         options: {
  //           compilerOptions: {
  //             isCustomElement: (tag) => tag === 'plastic-button',
  //           },
  //         },
  //       },
  //       // ...
  //     ],
  //   },
  // },
  // chainWebpack: config => {
  //  // get the existing vue-loader rule and tap into its options
  //   config.module.rule('vue-loader').tap(options => {
  //     option.compilerOptions = {
  //        ...(options.compilerOptions || {}), // merge existing compilerOptions, if any
  //        isCustomElement: tag => /^x-/.test(tag)
  //     }
  //   })
  // }
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .tap((options) => {
  //       return {
  //         compilerOptions: {
  //           // 为了 canvas-datagrid 而配置
  //           isCustomElement: (tag) => tag === 'canvas-datagrid',
  //         },
  //       }
  //     })
  // },
}
