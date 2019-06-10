import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { SECRET_KEY } from "../../config";
import {ValidatorLoginInput, ValidatorRegisterInput} from "../../utils/validators";

export const UserResolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
        const {valid, errors} = ValidatorLoginInput(username, password);

        const user = await User.findOne({ username });

        if (!user){
            errors.general = 'User not found';
            throw new UserInputError('User not found', {errors})
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match){
            errors.general = 'Wrong credentials';
            throw new UserInputError('Wrong credentials', {errors})
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        return { ...user._doc, id: user._id, token };
    },
    register: async (_, { registerInput: { username, email, password, confirmPassword } }) => {
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

      password = await bcrypt.hash(password, 15);

      const newUser = new User({
        email,
        password,
        username,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = jwt.sign(
        { id: res.id, username: res.username, email: res.email },
        SECRET_KEY,
        { expiresIn: "24h" }
      );

      return { ...res._doc, id: res._id, token };
    }
  }
};
