'use strict';

import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';

export default function makeStore() {
	return createStore(rootReducer);
}
