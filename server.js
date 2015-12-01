'use strict';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import open from 'open';

new WebpackDevServer(webpack(config), config.devServer)
					.listen(config.port, 'localhost', err => {
						if (err) { return err; }
						console.log('Listening at localhost:' + config.port);
						open('http://localhost:' + config.port + '/webpack-dev-server/');
					});
