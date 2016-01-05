import path from 'path'
import webpack from 'webpack'
import _ from 'lodash'
import baseConfig from './base'

const config = _.merge({
	entry: path.join(__dirname, '../src/scripts/index'),
	cache: false,
	devtool: 'sourcemap',
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.NoErrorsPlugin()
	]
}, baseConfig);

config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: 'babel',
	include: path.join(__dirname, '/../src')
});

export default config
