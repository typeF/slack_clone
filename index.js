import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import cors from 'cors'
import jwt from 'jsonwebtoken';

import models from "./models";
import { refreshTokens } from './auth';

const SECRET = 'My secret';
const SECRET2 = 'My secret2';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
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

const addUser = async (req, res, next) => {
  const token = req.headers['tokenx'];
  console.log('token: ', token);
  if (token) {
    try {
      console.log('jwt verify: ', jwt.verify(token, SECRET));
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
      console.log('req.user: ', req.user);
    } catch (err) {
      const refreshToken = req.headers['tokenrefresh'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'tokenx, tokenrefresh');
        res.set('tokenX', newTokens.token);
        res.set('tokenRefresh', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const graphqlEndpoint = "/graphql";

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2
    },
  }))
);

app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});
