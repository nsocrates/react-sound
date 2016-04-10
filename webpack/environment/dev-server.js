import path from 'path'
import webpack from 'webpack'
import baseConfig from './base'
import merge from 'lodash/merge'

const entry = path.join(__dirname, '..', '..', 'src', 'scripts', 'server')

const config = merge({
  entry,
  target: 'node',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    })
  ]
}, baseConfig)

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: path.join(__dirname, '..', '..', 'src')
})

export default config
