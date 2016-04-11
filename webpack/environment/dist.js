import path from 'path'
import webpack from 'webpack'
import merge from 'lodash/merge'
import baseConfig from './base'

const config = [merge({
  name: 'browser',
  entry: './scripts/client',
  output: {
    filename: 'bundle.js'
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVCLIENT__: false,
      __DEVSERVER__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig), merge({
  name: 'server rendering',
  entry: {
    server: './scripts/server'
  },
  target: 'node',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVCLIENT__: false,
      __DEVSERVER__: false
    })
  ]
}, baseConfig)]

config[0].module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '../..', 'src')
}, {
  test: /\.scss$/,
  loaders: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader?outputStyle=compressed'
  ]
})

config[1].module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '../..', 'src')
})

export default config
