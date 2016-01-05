import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'

// Create jsdom versions of document and window objects
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win

Object.keys(window).forEach(key => { // Copy jsdom window object to Node.js global object
	if (!(key in global)) {
		global[key] = window[key]
	}
})

chai.use(chaiImmutable)
