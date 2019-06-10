import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { MutationResolvers } from "../../server/src/generated/graphql";
import {SECRET_KEY} from "../../config";

export const UserResolvers: MutationResolvers = {
    // @ts-ignore
    register: async (_, { registerInput: { username, email, password, confirmPassword } }, ctx, info ) => {
        password = await bcrypt.hash(password, 15);

        const newUser = new User({
            email,
            password,
            username,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username
        }, SECRET_KEY, { expiresIn: '24h' })
    }
};
