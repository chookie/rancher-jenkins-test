'use strict';

import 'babel-polyfill'; // Don't really need this just here but may be elsewhere'
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes.js';
if(process.env.WEBPACK) require('./styles/styles.scss'); // this used to enable client side styling and styles hot reload
// Include favicon so it gets included in the build by webpack
import '../public/images/favicon.ico';
import '../src/components/common/fillScreen';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(
  reducers,
  preloadedState,
  applyMiddleware(thunk)
);

render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById("app")
);
