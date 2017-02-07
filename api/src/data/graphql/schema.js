'use strict';

export default`
    # This is the description for Link type
    type API {
        # The unique id assigned by the API Portal
        id: String! # ! means required
        # Name of the API registered by the api service
        name: String!
        description: String!
        # rest or graphql
        type: String!
        # Optional image
        imageUrl: String
        # URL that contains documentation for the API
        documentionUrl: String!
        # URL to use for a health check
        healthUrl: String
    }

    # Query the API Portal Server
    type Query {
        # Get a list of registered API's'
        apis(name: String, type: String, id: String): [API]
    }

    # This is the root of the API Portal schema
    schema {
        query: Query
    }
`
