const find = require('lodash/find')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express');

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const defaultProductInfo = {id: 0, name: 'Shirts', category: '', price: '', image: ''}
const products = [
  {
    id: 1,
    name: 'Blue Shirt',
    category: 'Shirts',
    price: '12.30',
    image: 'https://google.com/',
  },
  {
    id: 2,
    name: 'Black Jeans',
    category: 'Jeans',
    price: '17.99',
    image: 'https://youtube.com/',
  },
];

const resolvers = {
  Query: {
    products: () => products,
    getProducts: () => products,
  },
  Mutation: {
    addProduct: (root, args) => {
      const newProduct = Object.assign(defaultProductInfo, args)
      products.push(newProduct)
      const id = newProduct.id
      return find(products, (product) => product.id == id)
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Server started listening on port 4000")
})