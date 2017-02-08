'use strict';

// Enable dotenv

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import config from '../config';
import log from './logger';
import schemaString from './data/graphql/schema';
import mockResolver from './data/graphql/mockResolver';
import resolverMap from './data/graphql/dbResolver';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import GraphQLHTTP from 'express-graphql';
import morgan from 'morgan';
import compress from 'compression';

// Create variable app by executing express function.
const app = express();

if (config.env !== 'test') {
  // Don't need when in test mode
  // Combined uses Apache style logs
  app.use(morgan('combined'));
}

const port = normalizePort(config.port);
app.set('port', port);

// Apply gzip compression
app.use(compress());

// Used by other middleware to encode/decode form and json messages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(function( req, res, next) {
  res.set("content-type", "application/json");
  next();
});

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // res.send(200);
  next();
};
app.use(allowCrossDomain);


app.get("/", (req, res) => res.json({
  message: "Welcome to the Rancher, Docker, Jenkins Test Service",
  api: "/mocks for mock data, /graphql for data from mongo db",
  wiki: "Returns simulated API portal data",
  version: config.version
}));

// Make a GraphQL schema with no resolvers
const mockSchema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({
  schema: mockSchema,
  mocks: mockResolver,
  // overwrite all resolvers with the mocks
  preserveResolvers: false
});

app.use('/mock', GraphQLHTTP({
    schema: mockSchema,
    graphiql: true
}));

const realSchema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers: resolverMap()
});

app.use('/graphql', GraphQLHTTP({
    schema: realSchema,
    graphiql: true
}));

const server = http.createServer(app);
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function getPortAndType() {
  return typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = getPortAndType();

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  log.info(`config is ${config.configEnv}`);
  const bind = getPortAndType();
  log.info(`listening on ${bind}`);
}
