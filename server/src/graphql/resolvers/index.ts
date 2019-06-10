import { PostResolvers } from "./posts";
import { UserResolvers } from "./users";

const resolvers = {
  Query: {
    ...PostResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation
  }
};

export default resolvers;
