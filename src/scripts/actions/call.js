import { CALL_API } from 'constants/Api'

export function callApi(keys, { endpoint, types, schema }) {
  return Object.assign({}, keys, {
    [CALL_API]: {
      endpoint,
      types,
      schema
    }
  })
}
