import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';

import * as tableActions from './tableActions';
import TablePage from './components/TablePage.js';
// if(process.env.WEBPACK) require('./LoginContainer.scss');

class TableContainer extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss() {
    // this.props.actions.clearAlert();
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
    this.props.actions.loadData();
  }

  render() {
    let errorAlert;
    if (this.props.actions.showErrorMessage) {
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

TableContainer.propTypes = {
  data: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(storeState) {
  return {
    data: storeState.table.data,
    showErrorMessage: storeState.table.showErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tableActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
