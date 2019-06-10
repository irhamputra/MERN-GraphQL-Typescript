import { Post } from "../../models/Post";
import { QueryResolvers } from "../../generated/graphql";

const Query: QueryResolvers = {
  getPosts: async (): Promise<any> => {
    try {
      return await Post.find();
    } catch (e) {
      throw new Error("Error");
    }
  }
};

export const PostResolvers = {
  Query: {
    ...Query
  }
};
