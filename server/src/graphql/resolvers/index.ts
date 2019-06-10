import { UserResolvers } from "./users";
import { Resolvers } from "../../generated/graphql";
import { PostResolvers } from "./posts";

const resolvers: Resolvers = {
  Query: {
    ...PostResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation
  }
};

export default resolvers;
