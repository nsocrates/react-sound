/* eslint-disable max-len */

import path from 'path'
import webpack from 'webpack'
import baseConfig from './base'
import merge from 'lodash/merge'

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

const config = merge({
  entry: [
    './scripts/client',
    hotMiddlewareScript
  ],
  output: {
    filename: 'bundle.js'
  },
  cache: true,
  devtool: 'eval',
  name: 'browser',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false
    })
  ]
}, baseConfig)

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  plugins: [
    'react-transform', {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }]
    }
  ],
  include: path.join(__dirname, '../..', 'src'),
  exclude: path.join(__dirname, '/node_modules/')
}, {
  test: /\.scss$/,
  loaders: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader?outputStyle=compressed'
  ]
})

export default config
