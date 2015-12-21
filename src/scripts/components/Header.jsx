'use strict';

import React from 'react';

export default class Header extends React.Component {

	render() {
		return (
			<header className="header">
				<div className="container">
					<ul className="header-section">
						<li className="logo">
							<i className="fa fa-mixcloud" />
						</li>
						<li className="title">
							<a href="#">{ "reactSOUND" }</a>
						</li>
					</ul>
					<ul className="header-section">
						<li className="login">
							<a href="#">
								<i className="fa fa-user" />
							</a>
						</li>
					</ul>
				</div>
			</header>
		);
	}
}
