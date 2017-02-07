'use strict';

import React, { Component, PropTypes } from 'react';
import Header from './common/Header.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
