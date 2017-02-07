'use strict';

import React, { Component } from 'react';
import TableList from './TableList';

class TablePage extends Component {

  static propTypes = {
    apis: React.PropTypes.array,
    handleClick: React.PropTypes.func
  }
  render() { 
    return (
      <div className="container">
        <div className="row">
          <h1>Table</h1>
          <p>This page should display a table with some data. {this.props.apis.length}</p>
          <button type="submit" className="btn btn-success" onClick={this.props.handleClick}>Reload</button>
        </div>
        <div>
          <TableList apis={this.props.apis}/>
        </div>
      </div>
    );
  }
}

export default TablePage;
