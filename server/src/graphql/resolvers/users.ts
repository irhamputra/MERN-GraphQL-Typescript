import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { SECRET_KEY } from "../../config";
import {
  ValidatorLoginInput,
  ValidatorRegisterInput
} from "../../utils/validators";
import {
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationResolvers
} from "../../generated/graphql";

const Mutation: MutationResolvers = {
  login: async (
    root: any,
    { username, password }: MutationLoginArgs
  ): Promise<any> => {
    const { errors } = ValidatorLoginInput(username, password);

    const user = await User.findOne({ username });

    if (!user) {
      // @ts-ignore
      errors.general = "User not found";
      throw new UserInputError("User not found", { errors });
    }

    // @ts-ignore
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // @ts-ignore
      errors.general = "Wrong credentials";
      throw new UserInputError("Wrong credentials", { errors });
    }

    const token = jwt.sign(
      // @ts-ignore
      { id: user.id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // @ts-ignore
    return { ...user._doc, id: user._id, token };
  },

  register: async (root: any, args: MutationRegisterArgs): Promise<any> => {
    // @ts-ignore
    const { username, email, password, confirmPassword } = args.registerInput;

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

    const res = await newUser.save();

    const token = jwt.sign(
      // @ts-ignore
      { id: res.id, username: res.username, email: res.email },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // @ts-ignore
    return { ...res._doc, id: res._id, token };
  }
};

export const UserResolvers = {
  Mutation: {
    ...Mutation
  }
};
