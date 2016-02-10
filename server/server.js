// https://github.com/newtriks/generator-react-webpack

/*eslint no-console:0 */

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../config/config'
import open from 'open'

new WebpackDevServer(webpack(config), config.devServer)
          .listen(config.port, 'localhost', err => {
            if (err) throw err
            console.log(`Listening at localhost: ${config.port}`)
            open(`http://localhost:${config.port}`)
          })
