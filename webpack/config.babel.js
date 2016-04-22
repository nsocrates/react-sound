// https://github.com/newtriks/generator-react-webpack

import path from 'path'

// List of allowed environments
const allowedEnvs = ['dev', 'prod', 'test']

// Set the correct environment
function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'dev'
    case 'production':
      return 'prod'
    case 'test':
      return 'test'
    default:
      return 'dev'
  }
}

const currEnv = setEnvironment()
process.env.REACT_WEBPACK_ENV = currEnv

// Get available configurations
const configs = {
  base: require(path.join(__dirname, 'environment', 'base')),
  dev: require(path.join(__dirname, 'environment', 'dev')),
  prod: require(path.join(__dirname, 'environment', 'prod')),
  server: require(path.join(__dirname, 'environment', 'dev-server'))
}

// Get valid environment
function getValidEnv(env) {
  const isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1

  return isValid ? env : 'dev'
}

// Build the webpack configuration
function buildConfig(env) {
  const usedEnv = getValidEnv(env)
  const isServer = process.argv.indexOf('--server') !== -1

  return isServer ? configs.server.default : configs[usedEnv].default
}

export default buildConfig(currEnv)
