'use strict'

import path from 'path'
import autoprefixer from 'autoprefixer'

const port = 8000
const srcPath = path.join(__dirname, '/../src')
const publicPath = '/assets/'

const baseConfig = {
	port,
	debug: true,
	output: {
		path: path.join(__dirname, '/../dist/assets'),
		filename: 'bundle.js',
		publicPath
	},
	devServer: {
		contentBase: './src/',
		historyApiFallback: true,
		hot: true,
		port,
		publicPath,
		noInfo: false
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {
			config: `${srcPath}./scripts.config/${process.env.REACT_WEBPACK_ENV}`,
			actions: `${srcPath}./scripts/actions`,
			components: `${srcPath}./scripts/components/`,
			sources: `${srcPath}./scripts/sources/`,
			stores: `${srcPath}./scripts/stores`,
			styles: `${srcPath}./stylesheets/`
		}
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'autoprefixer-loader?browsers=last 2 versions',
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
		return []
	}
    return [
      autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8']
      })
    ]
}

export default baseConfig
