const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express');

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})

const resolvers = {
  Query: {
    books: () => books,
  },
};

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Server started listening on port 4000")
})