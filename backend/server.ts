import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

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

  // Define mongoose connection options
  const mongooseOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;

  mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

  const server = new ApolloServer({ typeDefs, resolvers });

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
