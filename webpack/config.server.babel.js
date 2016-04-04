import path from 'path'
import webpack from 'webpack'

const assetsPath = path.join(__dirname, '..', 'dist', 'assets')
const srcPath = path.join(__dirname, '..', 'src')

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
  entry: './src/scripts/server',
  target: 'node',
  output: {
    path: assetsPath,
    filename: 'server.js',
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders
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
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    })
  ]
}
