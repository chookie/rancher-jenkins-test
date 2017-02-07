'use strict';

import React from 'react';
import { Link, IndexLink } from 'react-router';
import LoginContainer from '../login/LoginContainer';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>

          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li><Link to="/print" activeClassName="active">Print</Link></li>
              <li><Link to="/save" activeClassName="active">Save</Link></li>
              <li><Link to="/table" activeClassName="active">Table</Link></li>
            </ul>
            <LoginContainer />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
