import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const authMiddleware = (context: any): any => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        return jwt.verify(token, SECRET_KEY);
      } catch (e) {
        throw new AuthenticationError("Invalid/expired token");
      }
    }
    throw new Error("Authentication token must be provided");
  }
  throw new Error("Authorization header be provided");
};
