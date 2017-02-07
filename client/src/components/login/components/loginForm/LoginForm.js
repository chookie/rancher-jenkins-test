import React, { Component } from 'react';

class LoginForm extends Component {

  static propTypes = {
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    handleClick: React.PropTypes.func
  }

  render () {
    return (
      <form className="navbar-form navbar-right">
        <div className="form-group">
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="form-control"
            value={this.props.email}
            onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form-control"
            value={this.props.password}
            onChange={this.props.handleChange} />
        </div>
        <button type="submit" className="btn btn-success" onClick={this.props.handleClick}>Sign in</button>
      </form>
    );
  }
}

export default LoginForm;
