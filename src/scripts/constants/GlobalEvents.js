'use strict';

import events from 'events';
export const GLOBAL_EVENTS = new events.EventEmitter();
const body = document.body;

const openModal = (isOpen) => {
	const searchbar = document.getElementById('m-searchbar');
	if (isOpen) {
		body.classList.add('m-open');
		searchbar.focus();
	} else {
		body.classList.remove('m-open');
	}
}

const applyOverflow = (isVisible) => {
	if (isVisible) {
		body.style.overflow = 'hidden';
	} else {
		body.style.overflow = '';
	}
}

GLOBAL_EVENTS
	.on('searchModal', openModal)
	.on('sideMenu', applyOverflow);
