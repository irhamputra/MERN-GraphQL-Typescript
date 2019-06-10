import { ApolloServer } from "apollo-server";
import '../../db'
import typeDefs from '../../graphql/typeDefs';
import resolvers from '../../graphql/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(res => {
  console.log(`Server running on ${res.url}`);
});
