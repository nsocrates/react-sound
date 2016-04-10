import path from 'path'
import webpack from 'webpack'
import baseConfig from './base'
import merge from 'lodash/merge'

const config = merge({
  entry: [
    'webpack/hot/only-dev-server',
    './src/scripts/client'
  ],
  output: {
    filename: 'app.js'
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
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '..', '..', 'src')
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
