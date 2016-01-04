'use strict';

var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

var config = _.merge({
	entry: [
		'webpack-dev-server/client?http://localhost:8000',
		'webpack/hot/only-dev-server',
		'./src/scripts/index'
	],
	cache: true,
	devtool: 'eval',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: 'react-hot!babel-loader',
	include: path.join(__dirname, '/../src')
});

module.exports = config;
