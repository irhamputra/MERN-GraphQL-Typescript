import { PostResolvers } from "./posts";
import {UserResolvers} from "./users";

const resolvers = {
  Query: {
    ...PostResolvers.getPosts
  },
  Mutation: {
    ...UserResolvers.register
  }
};

export default resolvers;
