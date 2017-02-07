'use strict';

import express from 'express';
const http = require('http');
const bodyParser = require('body-parser');
import config from 'config';
const log = require('./logger');
import schemaString from './data/graphql/schema';
import mockResolver from './data/graphql/mockResolver';
import resolverMap from './data/graphql/dbResolver';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import GraphQLHTTP from 'express-graphql';

// Create variable app by executing express function.
const app = express();

const port = normalizePort(config.port);
app.set('port', port);
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

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
const protocol = 'http';
server.listen(config.port, config.host);
server.on('error', onError);
server.on('listening', onListening.bind(null, server, protocol));


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

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
function onListening(server, protocol) {
  const addr = server.address();
  const url = `${protocol}://${addr.address}:${addr.port}`;
  log.info(`listening at ${url}`);
  /* eslint-disable no-console */
  console.log(`${config.appDisplay} listening at ${url}`);
  console.log(`Test using:\n  curl -kisS ${url}/graphql`);
}
