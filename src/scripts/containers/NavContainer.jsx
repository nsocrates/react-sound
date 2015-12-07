'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Nav from '../components/Nav';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return (
			<Nav {...this.props} />
		);
	}
})
