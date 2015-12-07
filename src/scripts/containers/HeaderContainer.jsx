'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Header from '../components/Header';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return (
			<Header {...this.props} />
		);
	}
})
