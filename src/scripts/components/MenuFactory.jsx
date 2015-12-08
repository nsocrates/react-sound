'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Menu from './Menu';
import MenuItem from './MenuItem';

export default React.createClass({
	mixins: [PureRenderMixin],
	getMenu: function() {
		this.slider.show();
	},
	closeMenu: function() {
		this.slider.hide();
	},
	render: function() {
		return (
			<div>
				<a onClick={this.getMenu} href="#"><i className="fa fa-bars"></i></a>
				<Menu ref={(ref) => this.slider = ref}>
					<a onClick={this.closeMenu} href="#"><i className="fa fa-times"></i></a>
					<div className="item-container">
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
