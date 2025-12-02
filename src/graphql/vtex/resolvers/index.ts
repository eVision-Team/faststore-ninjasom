import { productResolver } from "./product";

const resolvers = {
  Query: {
    ...productResolver,
  },
  Mutation: {},
};

export default resolvers;
