import path from 'path'
import autoprefixer from 'autoprefixer'

const port = 8000
const srcPath = path.join(__dirname, '..', '..', 'src')
const assetsPath = path.join(__dirname, '..', '..', 'dist', 'assets')
const publicPath = '/assets/'

const baseConfig = {
  port,
  debug: true,
  output: {
    path: assetsPath,
    publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port,
    publicPath,
    noInfo: true,
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
  module: {
    loaders: [{
      test: /\.(png|jpg|gif|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
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
