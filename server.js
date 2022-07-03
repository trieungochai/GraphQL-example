const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const app = express();
const PORT = process.env.PORT || 3000;
const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
});

const root = {
  products: require("./products/products.model"),
  orders: require("./orders/orders.model"),
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Running GraphQL server...");
});
