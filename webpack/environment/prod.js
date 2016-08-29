import path from 'path'
import webpack from 'webpack'
import merge from 'lodash/merge'
import baseConfig from './base'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const config = [merge({
  name: 'client bundle',
  entry: {
    app: './scripts/client'
  },
  output: {
    filename: '[name].js'
  },
  cache: false,
  devtool: false,
  plugins: [
    new ExtractTextPlugin('styles/main.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVCLIENT__: false,
      __DEVSERVER__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}, baseConfig), merge({
  name: 'server bundle',
  entry: {
    server: './scripts/server'
  },
  target: 'node',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new ExtractTextPlugin('styles/main.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
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
  loader: 'babel-loader',
  include: path.join(__dirname, '../..', 'src')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', [
    'css-loader?minimize',
    'postcss-loader',
    'sass-loader'
  ])
})

config[1].module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: path.join(__dirname, '../..', 'src'),
  query: {
    plugins: [
      'transform-react-remove-prop-types',
      'transform-react-constant-elements',
      'transform-react-inline-elements'
    ]
  }
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', [
    'css-loader?minimize',
    'postcss-loader',
    'sass-loader'
  ])
})

export default config
