import path from 'path'

const port = 8000
const srcPath = path.join(__dirname, '../..', 'src')
const assetsPath = path.join(__dirname, '../..', 'public', 'assets')
const publicPath = '/assets/'
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
]
const baseConfig = {
  port,
  context: srcPath,
  debug: true,
  output: {
    path: assetsPath,
    publicPath
  },
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
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
      actions: `${srcPath}/scripts/actions/`,
      components: `${srcPath}/scripts/components/`,
      constants: `${srcPath}/scripts/constants/`,
      containers: `${srcPath}/scripts/containers/`,
      middleware: `${srcPath}/scripts/middleware/`,
      reducers: `${srcPath}/scripts/reducers/`,
      routes: `${srcPath}/scripts/routes/`,
      soundcloud: `${srcPath}/scripts/soundcloud/`,
      store: `${srcPath}/scripts/store/`,
      stylesheets: `${srcPath}/stylesheets/main.scss`,
      utils: `${srcPath}/scripts/utils`,
      vendor: `${srcPath}/scripts/vendor`
    }
  },
  module: {
    loaders: [{
      test: /\.(png|jpg|gif|woff|woff2)$/,
      loader: 'url',
      query: {
        name: '[hash].[ext]',
        limit: 8192
      }
    }, {
      test: /\.(mp4|ogg|svg)$/,
      loader: 'file-loader'
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
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ]
  }
}

export default baseConfig
