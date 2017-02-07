'use strict';

import React, { Component } from 'react';

class SavePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Saving to Internal Service</h1>
          <p>Enter some text then click the button below to test the save feature.</p>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Enter some text here..." className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
      </div>
    );
  }
}

export default SavePage;
