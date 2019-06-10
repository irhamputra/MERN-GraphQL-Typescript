import { Post } from "../../models/Post";
import { QueryResolvers } from "../../server/src/generated/graphql";

export const PostResolvers: QueryResolvers = {
  // @ts-ignore
  getPosts: async () => {
    try {
      return await Post.find();
    } catch (e) {
      throw new Error("Error");
    }
  }
};
