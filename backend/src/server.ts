import express from "express";
import { ApolloServer,  } from "apollo-server-express";

import fileUpload  from "express-fileupload"

import resolvers from "./resolvers";
import  typeDefs from "./typeDefs";

import uploadHandler from "./fileUpload";


async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

  app.post("/upload", uploadHandler);
  
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  return { server, app };
}

module.exports = startServer;
