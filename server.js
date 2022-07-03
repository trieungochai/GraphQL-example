const express = require("express");
const { buildSchema, graphql } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const PORT = process.env.PORT || 3000;

const schema = buildSchema(`
  type Query {
    products: [Product]
    orders: [Order]
  }

  type Product {
    id: ID!,
    description: String!
    review: [Review]
    price: Float!
  }

  type Review {
    rating: Int!
    comment: String
  }

  type Order {
    date: String!
    subtotal: Float!
    item: [OrderItem]
  }

  type OrderItem {
    product: Product!
    quantity: Int!
  }
`);

const root = {
  products: [
    {
      id: "redshoe",
      description: "Red Shoe",
      price: 42.12,
    },
    {
      id: "bluejean",
      description: "Blue Jeans",
      price: 55.55,
    },
  ],
  orders: [
    {
      date: "2005-05-05",
      subtotal: 90.22,
      item: [
        {
          product: {
            id: "redshoe",
            description: "Old Red Shoe",
            price: 45.11,
          },
          quantity: 2,
        },
      ],
    },
  ],
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
