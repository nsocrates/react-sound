'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<main className="main">
				<div className="container">
					<div className="gallery"></div>
					<div className="gallery"></div>
					<div className="gallery"></div>
					<div className="gallery"></div>
					<div className="gallery"></div>
					<div className="gallery"></div>
					<div className="gallery"></div>
				</div>
			</main>
		);
	}
});
