import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const app = new Koa();
const router = new Router();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

const mongooseOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose.connect(mongoUri, mongooseOptions);

const server = new ApolloServer({ typeDefs, resolvers });

app.use(bodyParser());

server.applyMiddleware({ app });

app.use(router.routes()).use(router.allowedMethods());

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
