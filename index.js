import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers/index.js';
import fs from 'fs';

const schema = fs.readFileSync('./mockSchema.graphql', 'utf-8');
const typeDefs = gql`${schema}`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
//   mocks: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
