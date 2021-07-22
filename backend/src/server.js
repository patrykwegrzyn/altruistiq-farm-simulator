const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const fileUpload = require("express-fileupload")

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const uploadHandler = require("./fileUpload");


async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

  app.post("/upload", uploadHandler);
  
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

module.exports = startServer;
