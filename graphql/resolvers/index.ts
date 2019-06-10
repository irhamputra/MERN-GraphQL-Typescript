import { PostResolvers } from "./posts";

const resolvers = {
  Query: {
    ...PostResolvers.Query
  },
  Mutation: {
  }
};

export default resolvers;
