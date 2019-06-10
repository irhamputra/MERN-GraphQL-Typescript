import { Post } from "../../models/Post";
import { QueryGetPostArgs, QueryResolvers } from "../../generated/graphql";
import { User } from "../../models/User";

const QueryResolver: QueryResolvers = {
  getUsers: async (): Promise<any> => {
    try {
      return await User.find().sort({ createdAt: -1 });
    } catch (e) {
      throw new Error("No users");
    }
  },
  getPosts: async (): Promise<any> => {
    try {
      return await Post.find().sort({ createdAt: -1 });
    } catch (e) {
      throw new Error("Error");
    }
  },
  getPost: async (root: any, args: QueryGetPostArgs): Promise<any> => {
    try {
      const post = await Post.findById(args.postID);

      if (!post) throw new Error("Post not found");

      return post;
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const AllQuery = {
  Query: {
    ...QueryResolver
  }
};
