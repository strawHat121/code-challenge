import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

// Load environment variables from .env file
dotenv.config();

const startServer = async () => {
  const app = new Koa();
  const router = new Router();

  // Check if MONGO_URI is defined
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with failure
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection in production
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(), // Enable GraphQL Playground
    ], // Enable GraphQL Playground
  });

  // Start the Apollo Server
  await server.start();

  app.use(bodyParser());

  // Apply Apollo Server middleware
  server.applyMiddleware({ app });

  app.use(router.routes()).use(router.allowedMethods());

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `Server is running on http://localhost:${port}${server.graphqlPath}`
    );
  });
};

// Start the server
startServer().catch((error) => {
  console.error("Failed to start the server", error);
});
