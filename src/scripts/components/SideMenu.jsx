'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuFactory from './SideMenuFactory';
import MenuItem from './SideMenuItem';
import {GENRES} from '../constants/ItemLists';

export default React.createClass({
	mixins: [PureRenderMixin],

	componentDidUpdate: function() {
		this.getMenu();
	},

	getItems: function() {
		return GENRES.map((item, index) => {
			return (
				<MenuItem key={ index }>{ item }</MenuItem>
			);
		});
	},

	handleClick: function() {
		this.props.onToggleMenu();
	},

	getMenu: function() {
		this.menu.toggleMenu();
	},

	render: function() {
		return (
			<div className="off-canvas-menu">
				<MenuFactory ref={ (ref) => this.menu = ref }>
					<span className="oc-cross" onClick={ this.handleClick }><i className="fa fa-times"></i></span>
					<div className="oc-item-container">
						{ this.getItems() }
					</div>
				</MenuFactory>
			</div>
		);
	}
});
