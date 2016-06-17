import path from 'path'
import webpack from 'webpack'
import baseConfig from './base'
import merge from 'lodash/merge'

const config = merge({
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    })
  ]
}, baseConfig)

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '../..', 'src'),
  exclude: path.join(__dirname, '/node_modules/')
})

export default config
