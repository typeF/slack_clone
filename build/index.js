"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var apollo_server_express_1 = require("apollo-server-express");
var path_1 = require("path");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var cors_1 = require("cors");
var models_1 = require("./models");
var SECRET = 'My secret';
var SECRET2 = 'My secret2';
var typeDefs = merge_graphql_schemas_1.mergeTypes(merge_graphql_schemas_1.fileLoader(path_1.default.join(__dirname, "./src/schema")));
var resolvers = merge_graphql_schemas_1.mergeResolvers(merge_graphql_schemas_1.fileLoader(path_1.default.join(__dirname, "./resolvers")));
var graphql_tools_1 = require("graphql-tools");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
var PORT = 8080;
var app = express_1.default();
app.use(cors_1.default('*'));
var graphqlEndpoint = "/graphql";
app.use(graphqlEndpoint, body_parser_1.default.json(), apollo_server_express_1.graphqlExpress({
    schema: exports.schema,
    context: {
        models: models_1.default,
        user: {
            id: 1,
        },
        SECRET: SECRET,
        SECRET2: SECRET2
    },
}));
app.use("/graphiql", apollo_server_express_1.graphiqlExpress({ endpointURL: graphqlEndpoint }));
models_1.default["sequelize"].sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on port " + PORT + "...");
    });
});
//# sourceMappingURL=index.js.map