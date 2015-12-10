// Entry point for off-canvas menu

'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Menu from './Menu';
import MenuItem from './MenuItem';

export default React.createClass({
	mixins: [PureRenderMixin],

	getMenu: function() {
		this.menu.toggleMenu();
	},

	render: function() {
		return (
			<div>
				<a onClick={this.getMenu} href="#"><i className="fa fa-bars"></i></a>
				<Menu ref={(ref) => this.menu = ref}>
					<a onClick={this.getMenu} href="#"><i className="fa fa-times"></i></a>
					<div className="oc-item-container">
						<MenuItem hash="dnb">Drum & Bass</MenuItem>
						<MenuItem hash="electro">Electro</MenuItem>
						<MenuItem hash="hardstyle">Hardstyle</MenuItem>
						<MenuItem hash="house">House</MenuItem>
						<MenuItem hash="techno">Techno</MenuItem>
						<MenuItem hash="trance">Trance</MenuItem>
					</div>
				</Menu>
			</div>
		);
	}
});
