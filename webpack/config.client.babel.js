/* eslint-disable max-len */

import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'

const assetsPath = path.join(__dirname, '..', 'dist', 'assets')
const srcPath = path.join(__dirname, '..', 'src')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const commonLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: path.join(__dirname, '..', 'src')
}, {
  test: /\.json$/,
  loader: 'json-loader'
}, {
  test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
  loader: 'url-loader?limit=10000'
}, {
  test: /\.html$/, loader: 'html-loader'
}]

export default {
  devtool: 'eval',
  name: 'browser',
  entry: {
    app: ['./src/scripts/client', hotMiddlewareScript]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    publicPath: '/assets/'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=compressed'
        ],
        include: path.join(__dirname, '..', 'src', 'stylesheets')
      }
    ])
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
      auth: `${srcPath}/scripts/auth/`,
      components: `${srcPath}/scripts/components/`,
      constants: `${srcPath}/scripts/constants/`,
      containers: `${srcPath}/scripts/containers/`,
      middleware: `${srcPath}/scripts/middleware/`,
      reducers: `${srcPath}/scripts/reducers/`,
      routes: `${srcPath}/scripts/routes/`,
      store: `${srcPath}/scripts/store/`,
      stylesheets: `${srcPath}/stylesheets/main.scss`,
      utils: `${srcPath}/scripts/utils`
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false
    })
  ],
  postcss() {
    return [
      autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8']
      })
    ]
  }
}
