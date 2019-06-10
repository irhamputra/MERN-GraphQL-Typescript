import { Post } from "../../models/Post";

export const PostResolvers = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find();
      } catch (e) {
        throw new Error("Error");
      }
    }
  }
};
