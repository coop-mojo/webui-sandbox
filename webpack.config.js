const path = require('path')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const appName = '生協の知恵袋'

module.exports = (env, argv) => {
  const is_production = argv.mode == 'production'
  const cdn_base = 'https://cdn.jsdelivr.net/npm/'
  const vue_version = '2.5.21'
  const vue_router_version = '3.0.2'
  const vuex_version = '3.0.1'
  const vuetify_version = '0.17.7'

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'build.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]?[hash]'
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ]
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    devtool: is_production ? 'none' : 'eval-source-map',
    plugins: [
      new VueLoaderPlugin(),
      new FaviconsWebpackPlugin({
        logo: './src/assets/moecoop.svg',
        prefix: 'images/',
        inject: true,
        title: appName,
      }),
      new HtmlWebpackPlugin({
        title: appName,
        template: '!!html-loader!./index.html'
      }),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'vue',
            entry: cdn_base+'/vue@'+vue_version+'/dist/'+(is_production ? 'vue.runtime.min.js' : 'vue.js'),
            global: 'Vue'
          },
          {
            module: 'vue-router',
            entry: cdn_base+'/vue-router@'+vue_router_version+'/dist/vue-router.js',
            global: 'VueRouter'
          },
          {
            module: 'vuex',
            entry: cdn_base+'/vuex@'+vuex_version+'/dist/vuex.js',
            global: 'Vuex'
          },
          {
            module: 'vuetify',
            entry: [
              cdn_base+'/vuetify@'+vuetify_version+'/dist/vuetify.js',
              cdn_base+'/vuetify@'+vuetify_version+'/dist/vuetify.min.css',
            ],
            global: 'Vuetify'
          },
        ]
      })
    ].concat(is_production ? [] : [new BundleAnalyzerPlugin()])
  }
}
