import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { logInUser, clearAlert } from './loginActions';
import LoginForm from './components/loginForm/LoginForm.js';
if(process.env.WEBPACK) require('./LoginContainer.scss');

class LoginContainer extends Component {
  static propTypes = {
    logInUser: React.PropTypes.func.isRequired,
    clearAlert: React.PropTypes.func,
    showErrorMessage: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
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
    this.props.logInUser(this.state.email, this.state.password);
  }

  render() {
    let errorAlert;
    if (this.props.showErrorMessage) {
      errorAlert = this.showAlert('Oh snap! You have a login error!');
    }

    return (
      <div>
        {errorAlert}
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleClick={this.handleClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showErrorMessage: state.login.showErrorMessage
  };
}


export default connect(mapStateToProps, { logInUser, clearAlert })(LoginContainer);
