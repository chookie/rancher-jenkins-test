import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { loadData } from './tableActions';
import TablePage from './components/TablePage.js';
// if(process.env.WEBPACK) require('./LoginContainer.scss');

class TableContainer extends Component {
  static propTypes = {
    loadData: React.PropTypes.func.isRequired,
    clearAlert: React.PropTypes.func,
    showErrorMessage: React.PropTypes.bool,
    data: React.PropTypes.array
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss() {
    this.props.clearAlert();
  }

  showAlert(message) {
    return (
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
        <h4>{message}</h4>
      </Alert>
    );
  }

  handleClick(event) {
    event.preventDefault();
    this.props.loadData();
  }

  render() {
    let errorAlert;
    if (this.props.showErrorMessage) {
      errorAlert = this.showAlert('Oh snap! You have a load error!');
    }

    return (
      <div>
        {errorAlert}
        <TablePage
          portfolios={this.props.data}
          handleClick={this.handleClick} 
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.table.data ? state.table.data:[],
    showErrorMessage: state.table.showErrorMessage
  };
}


export default connect(mapStateToProps, { loadData })(TableContainer);
