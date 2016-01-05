'use strict'

import { expect } from 'chai'
import { sideMenu } from '../src/scripts/reducers/sideMenu'

describe('Off Canvas Menu', () => {
	it('is initially closed', () => {
		expect(sideMenu(undefined, {})).to.equal(false)
	})

	it('toggles between states', () => {
		const action = { type: 'TOGGLE_MENU' }
		expect(sideMenu(false, action)).to.equal(true)
		expect(sideMenu(true, action)).to.equal(false)
	})
})
