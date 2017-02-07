'use strict';

import React, { Component } from 'react';

class PrintPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Printing</h1>
          <p>Click the button below to test the printing feature.</p>
          <button className="btn btn-primary">Print</button>
        </div>
      </div>
    );
  }
}

export default PrintPage;
