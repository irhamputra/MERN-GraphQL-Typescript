import { ApolloServer } from "apollo-server";
import './db'
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  context: ({req}) => ({req})
});

server.listen({ port: 4000 }).then((res: Response) => {
  console.log(`Server running on ${res.url}`);
});
