// https://github.com/newtriks/generator-react-webpack

import path from 'path'
import parseArgs from 'minimist'

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test']

// Set the correct environment
const args = parseArgs(process.argv.slice(2))

function setEnvironment() {
  if (args._.length > 0 && args._.indexOf('start') !== -1) {
    return 'test'
  } else if (args.env) {
    return args.env
  }

  return 'dev'
}

const currEnv = setEnvironment()
process.env.REACT_WEBPACK_ENV = currEnv

// Get available configurations
const configs = {
  base: require(path.join(__dirname, './environment/base')),
  dev: require(path.join(__dirname, './environment/dev')),
  dist: require(path.join(__dirname, './environment/dist'))
}

// Get valid environment
function getValidEnv(env) {
  const isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1

  return isValid ? env : 'dev'
}

// Build the webpack configuration
function buildConfig(env) {
  const usedEnv = getValidEnv(env)

  return configs[usedEnv].default
}

export default buildConfig(currEnv)
