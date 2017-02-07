import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';
import projectConfig from 'config';
import open from 'open';
import historyApiFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {chalkError, chalkSuccess, chalkDevelopment, chalkProduction} from '../tools/chalkConfig';
import compress from 'compression';
import React from 'react';
import { match, RouterContext } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import PrettyError from 'pretty-error';
import { renderToString } from 'react-dom/server';
import configureStore from '../src/store/configureStore';
import routes from '../src/routes.js';
import cookieParser from 'cookie-parser';
import { getHtml }  from './server-utils.js';
// Stop lint erros because ysing console.log
/* eslint-disable no-console */
const pretty = new PrettyError();
const app = express();
let styleSrc = '';
let jsSrc = '';
// Required for react-router browserHistory
// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(historyApiFallback({
  verbose: false
}));
// Apply gzip compression
app.use(compress());
app.use(cookieParser());

if (projectConfig.env === 'development') {
  const compiler = webpack(webpackConfig);
  jsSrc = '/dist/bundle.js';

  app.use(webpackDevMiddleware(compiler, {
    // Dev middleware can't access config, so we provide publicPath
    publicPath: webpackConfig.output.publicPath,
    // These settings suppress noisy webpack output so only errors are displayed to the console.
    noInfo: true,
    hot: true,
    quiet: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
    // for other settings see http://webpack.github.io/docs/webpack-dev-middleware.html
  }));

  app.use(webpackHotMiddleware(compiler));

}
if (projectConfig.env === 'production') {
  const mainfestJson = require('../webpack-assets.json');
  styleSrc = mainfestJson.main.css;
  jsSrc = mainfestJson.main.js;
}

app.use('/', express.static('public'));

app.use((req, res) => {
  const memoryHistory = createHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathName + redirectLocation.search);
    } else if (err) {
      console.error('ROUTER ERROR:', pretty.render(err));
      res.status(500);
    } else if (renderProps) {
      const preloadedState = store.getState();
      const html = renderToString(
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );
      const head = { meta: { description: 'Walking skeleton for Cardano DC.' }, title: 'Cardano DCWS'};
      res.status(200).send(getHtml({head, preloadedState, html, styleSrc, jsSrc}));
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(projectConfig.port, function (err) {
  if (err) {
    console.log(chalkError(err));
  } else {
    const url = `http://${projectConfig.host}:${projectConfig.port}`;
    const chalkColour = projectConfig.env === 'development' ? chalkDevelopment : chalkProduction;
    console.log(chalkSuccess(`${projectConfig.apppName} started in ${chalkColour(projectConfig.env)} mode on ${url}`));
    open(url);
  }
});
