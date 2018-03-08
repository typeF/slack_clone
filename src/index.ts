import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import cors from 'cors';

import models from "./models";

const SECRET = 'My secret';
const SECRET2 = 'My secret2';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./src/schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

import { makeExecutableSchema } from "graphql-tools";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 8080;

const app = express();

app.use(cors('*'));

const graphqlEndpoint = "/graphql";

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1,
      },
      SECRET,
      SECRET2
    },
  })
);

app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

models["sequelize"].sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});
