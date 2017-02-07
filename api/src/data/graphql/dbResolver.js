'use strict';

const data = require('../../data');

let Resolver = () => {
  // db.collection("links").find({}).toArray().then( (res) =>
  //   console.log(res)
  // );

  let resolver = {
    Query: {
      apis(root, args, context, info) {
        // let findParams = {
        //   name: args.name,
        //   type: args.type,
        //   id: args.id
        // };
        return data.getApis(args);
      }
    }
    // Map mongo _id to our id field
    ,API: {
      id(root, args, context, info) {
        return root._id;
      }
    }
  }

  return resolver;
}

export default Resolver;
