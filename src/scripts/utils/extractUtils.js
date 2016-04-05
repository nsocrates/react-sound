export function extractStreamableTracks(trackEntity, ids) {
  return ids.filter(id => (
    trackEntity[id].streamable
  ))
}

export function extractNumber(string) {
  const number = string.match(/\d/g).join('')

  return number
}
