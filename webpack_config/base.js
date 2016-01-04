'use strict';

var path = require('path');
var port = 8000;
var srcPath = path.join(__dirname, '/../src');
var publicPath = '/assets/';
module.exports = {
	port: port,
	debug: true,
	output: {
		path: path.join(__dirname, '/../dist/assets'),
		filename: 'bundle.js',
		publicPath: publicPath
	},
	devServer: {
		contentBase: './src/',
		historyApiFallback: true,
		hot: true,
		port: port,
		publicPath: publicPath,
		noInfo: false
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {
			config: srcPath + './scripts/config/' + process.env.REACT_WEBPACK_ENV,
			actions: srcPath + './scripts/actions/',
			components: srcPath + './scripts/components/',
			sources: srcPath + './scripts/sources/',
			stores: srcPath + './scripts/stores/',
			styles: srcPath + './stylesheets/'
		}
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!postcss-loader!sass-loader?outputStyle=compressed'
			},
			{
				test: /\.(png|jpg|gif|woff|woff2)$/,
				loader: 'url-loader?limit=8192'
			}
		]
	},
	postcss: function() {
		return [];
	}
};
