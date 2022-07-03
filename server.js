const express = require("express");
const { buildSchema, graphql } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const PORT = process.env.PORT || 3000;

const schema = buildSchema(`
  type Query {
    description: String
    price: Float
  }
`);

const root = {
  description: "Red Shoe",
  price: 42.12,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
  })
);

app.listen(PORT, () => {
  console.log("Running GraphQL server...");
});
