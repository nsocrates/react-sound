'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return (
			<header className="header">
				<div className="container flex">
					<ul className="header-section">
						<li className="logo"><i className="fa fa-mixcloud"></i></li>
						<li className="title"><a href="#">reactSOUND</a></li>
					</ul>
					<ul className="header-section">
						<li className="search"><a href="#"><i className="fa fa-search"></i></a></li>
					</ul>
				</div>
			</header>
		);
	}
});
