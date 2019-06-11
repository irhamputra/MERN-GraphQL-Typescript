import { AllMutation } from "./Mutation";
import { AllQuery } from "./Query";
import { Resolvers } from "../../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    ...AllQuery.Query
  },
  Mutation: {
    ...AllMutation.Mutation
  }
};

export default resolvers;
