// https://github.com/newtriks/generator-react-webpack

'use strict'

import path from 'path'
import autoprefixer from 'autoprefixer'

const port = 8000
const srcPath = path.join(__dirname, '/../../src')
const publicPath = '/assets/'

const baseConfig = {
  port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../../dist/assets'),
    filename: 'bundle.js',
    publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port,
    publicPath,
    noInfo: false,
    stats: {
      colors: true
    }
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    alias: {
      config: `${srcPath}/scripts.config/${process.env.REACT_WEBPACK_ENV}`,
      actions: `${srcPath}/scripts/actions/`,
      components: `${srcPath}/scripts/components/`,
      constants: `${srcPath}/scripts/constants/`,
      containers: `${srcPath}/scripts/containers/`,
      middleware: `${srcPath}/scripts/middleware/`,
      oauth: `${srcPath}/scripts/oauth`,
      reducers: `${srcPath}/scripts/reducers/`,
      routes: `${srcPath}/scripts/routes/`,
      store: `${srcPath}/scripts/store/`,
      stylesheets: `${srcPath}/stylesheets/main.scss`,
      utils: `${srcPath}/scripts/utils`
    }
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=compressed'
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  postcss() {
    return [
      autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8']
      })
    ]
  }
}

export default baseConfig
