/* eslint-disable max-len */

export default function separateLinksFromText(string) {
  /**
   * http://daringfireball.net/2010/07/improved_regex_for_matching_urls
   * http://stackoverflow.com/questions/6927719/url-regex-does-not-work-in-javascript
   */
  const reUrl = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i
  const arr = string.replace(/<.+?>|&.*?;|\r/g, '')
                    .split(/\n/)
                    .map(item => item.trim()
                                     .split(reUrl)
                                     .filter(n => !!n))
                    .filter(item => item.length > 0)

  // Sets url to array[1]
  arr.forEach(item => {
    const another = item

    if (reUrl.test(another.toString()) && !reUrl.test(another[1])) {
      another[1] = another[0]
      another[0] = null
    }

    return another
  })

  return arr
}
