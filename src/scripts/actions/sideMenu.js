'use strict';

import * as types from '../constants/ActionTypes';

export function toggleMenu(toggle) {
	return { type: types.TOGGLE_MENU, toggle };
}
