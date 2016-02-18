import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'

export function loadCollection(path, query) {
  if (path === '#genre') {
    return loadGenre(query, false)
  } else if (path === '#search') {
    return loadSearch(query, false)
  }
}
