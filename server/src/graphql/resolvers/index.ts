import { AllMutation } from "./Mutation";
import { Resolvers } from "../../generated/graphql";
import { AllQuery } from "./Query";

const resolvers: Resolvers = {
  Query: {
    ...AllQuery.Query
  },
  Mutation: {
    ...AllMutation.Mutation
  }
};

export default resolvers;
