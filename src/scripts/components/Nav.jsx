'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return (
			<nav className="nav-bar">
				<div className="container flex">
					<ul className="nav-section">
						<li className="genre"><a href="#">Drum & Bass</a></li>
						<li className="genre"><a href="#">Electro</a></li>
						<li className="genre"><a href="#">Hardstyle</a></li>
						<li className="genre"><a href="#">House</a></li>
						<li className="genre"><a href="#">Techno</a></li>
						<li className="genre"><a href="#">Trance</a></li>
					</ul>
					<ul className="nav-section">
						<li className="bars"><a href="#"><i className="fa fa-bars"></i></a></li>
					</ul>
				</div>
			</nav>
		);
	}
});
