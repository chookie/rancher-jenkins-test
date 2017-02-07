# GraphQL Mocking

Playing with Apollo graphql tools for mocking out a GraphQL service to facilitate consumer driven design.  The workflow would be:
* Create the schema using the a simple Apollo string template.
* Return mock data so consumers can play with the API to see if it does what they need.
* Iterate through modifying, using the API until it is right.
* Allow different teams to use the API whilst the API team develops the real logic.
* Once the real service is ready either swap the mock data for the real data or have 2 endpoints, one for mock data and one for real data.  Keeping the mock data would allow for future changes to be tested.  In fact, you can add as many endpoints as you like.

[http://graphql.org/blog/mocking-with-graphql](http://graphql.org/blog/mocking-with-graphql)</br>
[https://github.com/apollostack/graphql-tools](https://github.com/apollostack/graphql-tools)

