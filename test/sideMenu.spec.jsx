'use strict';

import React from 'react/addons';
import {expect} from 'chai';
import {menu} from '../src/scripts/reducers/reducers';

const {renderIntoDocument, Simulate}
	= React.addons.TestUtils;

describe('Off Canvas Menu', () => {

	it('is initially closed', () => {
		expect(menu(undefined, {})).to.equal(false);
	});

	it('toggles between states', () => {
		const action = {type: 'TOGGLE_MENU'};
		expect(menu(false, action)).to.equal(true);
		expect(menu(true, action)).to.equal(false);
	});

});
