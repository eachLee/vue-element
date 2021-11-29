'use strict'
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin') //Gzip
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin //Webpack包文件分析器
const resolve = dir => path.join(__dirname, dir)

// vue.config配置文档 https://cli.vuejs.org/config/
module.exports = {
  // publicPath:
  //   process.env.port === 'production'
  //     ? '/prod'
  //     : process.env.port === 'test'
  //     ? '/test'
  //     : '/dev',
  // publicPath: '/',
  outputDir: 'dist', //打包地址 默认dist
  assetsDir: 'static', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development', // eslint-loader 是否在保存的时候检查
  productionSourceMap: process.env.NODE_ENV === 'development',
  transpileDependencies: ['vue-particles', 'animejs'],
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      //代理
      [process.env.VUE_APP_BASE_API]: {
        //target: `http://localhost:2222`,
        // target: `http://10.5.234.84:8077`,
        target: `http://10.5.4.106:10001`,  //hr测试地址
        changeOrigin: true, //代理开关
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/api/hrplus/v1.0'
        }
      }
    }
  },
  configureWebpack: config => {

    let pluginsPro = [
      new CompressionPlugin({
        //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 8192, //只处理比这个值大的资源。按字节计算
        minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
        deleteOriginalAssets: false //是否删除原资源 默认false
      })
    ]
    let pluginsProReport = [
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin() //本地打包查看打包后项目大小
    ]
    if (process.env.NODE_ENV == 'production') {
      config.plugins = [...config.plugins, ...pluginsPro]
      if (process.env.npm_config_report) {
        config.plugins = [...config.plugins, ...pluginsProReport]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    config.plugins.delete('preload') // 删除预加载 预注入
    config.plugins.delete('prefetch') //关闭预先加载模块

    // 解决ie11兼容ES6
    config.entry('main').add('babel-polyfill')

    // // 开启图片压缩
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end()

    //set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace 删除标签间的空格 v-html除外
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` 和 runtimeChunk name 必须一样. 默认 `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        //设置缓存chunks
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 仅包括最初依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 将elementUI 单独放在一个包
            priority: 20, // 优先级要大于 libs or app   否则会被打包到libs和app中
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 模板模块
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
