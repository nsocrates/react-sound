'use strict';

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <div className="box"><h1 className="greeting">Hello</h1></div>
        <p>Some dummy text here</p>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
