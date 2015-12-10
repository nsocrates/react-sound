'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Main from '../components/Main';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return (
			<Main {...this.props} />
		);
	}
})
