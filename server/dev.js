// https://github.com/newtriks/generator-react-webpack
/* eslint-disable no-console */

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../webpack/config.babel'

new WebpackDevServer(webpack(config), config.devServer)
          .listen(config.port, 'localhost', err => {
            if (err) throw err
            console.log(`Listening at localhost: ${config.port}`)
          })
