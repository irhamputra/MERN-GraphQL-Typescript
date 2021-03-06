import { UserInputError, AuthenticationError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { Post } from "../../models/Post";
import { SECRET_KEY } from "../../config";
import {
  MutationCreatePostArgs,
  MutationDeletePostArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationResolvers
} from "../../generated/graphql";
import {
  ValidatorLoginInput,
  ValidatorRegisterInput
} from "../../utils/validators";
import { authMiddleware } from "../../utils/auth-middleware";

const MutationResolver: MutationResolvers = {
  // Login
  login: async (
    root,
    { username, password }: MutationLoginArgs
  ): Promise<any> => {
    const { errors } = ValidatorLoginInput(username, password);

    const user: any = await User.findOne({ username });

    if (!user) {
      errors.general = "User not found";
      throw new UserInputError("User not found", { errors });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      errors.general = "Wrong credentials";
      throw new UserInputError("Wrong credentials", { errors });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    return {
      ...user._doc,
      id: user._id,
      token
    };
  },

  // Register
  register: async (root, args: MutationRegisterArgs): Promise<any> => {
    const {
      username,
      email,
      password,
      confirmPassword
    }: any = args.registerInput;

    const { valid, errors } = ValidatorRegisterInput(
      username,
      email,
      password,
      confirmPassword
    );

    if (!valid) throw new UserInputError("Errors", { errors });

    const user = await User.findOne({ username });

    if (user) {
      throw new UserInputError("Username has been taken", {
        errors: {
          username: "This username is taken"
        }
      });
    }

    const userPassword = await bcrypt.hash(password, 15);

    const newUser = new User({
      email,
      password: userPassword,
      username,
      createdAt: new Date().toISOString()
    });

    const res: any = await newUser.save();

    const token = jwt.sign(
      {
        id: res.id,
        username: res.username,
        email: res.email
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    return {
      ...res._doc,
      id: res._id,
      token
    };
  },
  createPost: async (
    root,
    { body }: MutationCreatePostArgs,
    ctx
  ): Promise<any> => {
    const { id, username } = authMiddleware(ctx);

    const newPost = new Post({
      body,
      user: id,
      username,
      createdAt: new Date().toISOString()
    });

    return await newPost.save();
  },
  deletePost: async (
    root,
    { postID }: MutationDeletePostArgs,
    ctx
  ): Promise<any> => {
    const user: any = authMiddleware(ctx);
    try {
      const post: any = await Post.findById(postID);

      if (user.username === post.username) {
        await post.delete();
        return "Post deleted successfully";
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const AllMutation = {
  Mutation: {
    ...MutationResolver
  }
};
