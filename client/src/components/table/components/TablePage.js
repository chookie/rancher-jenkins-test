'use strict';

import React, { Component } from 'react';
import TableList from './TableList';

class TablePage extends Component {

  static propTypes = {
    portfolios: React.PropTypes.array,
    handleClick: React.PropTypes.func
  }

  render() { 
    return (
      <div className="container">
        <div className="row">
          <h1>Table</h1>
          <p>This page should display a table with some data. {this.props.portfolios.length}</p>
          <button type="submit" className="btn btn-success" onClick={this.props.handleClick}>Reload</button>
        </div>
        <div>
          <TableList portfolios={this.props.portfolios}/>
        </div>
      </div>
    );
  }
}

export default TablePage;
