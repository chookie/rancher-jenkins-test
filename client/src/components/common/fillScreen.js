'use strict';

import { Component } from 'react';

class MyComponent extends Component {

  // this method is only invoked in the browser environment
  componentDidMount() {
    const fill = function() {
        $('.fill-screen').css('height', window.innerHeight);
      };
      $(function() {
        // on('load') does not seem to work on chrome, ok on safari.
        fill();
        $(window).on('resize', fill);
      });
  }

  render() {}

}

module.exports = MyComponent;
