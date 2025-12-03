import { buyTogetherResolver } from "./buyTogether";
import { productResolver } from "./product";

const resolvers = {
  Query: {
    ...productResolver,
    ...buyTogetherResolver,
  },
  Mutation: {},
};

export default resolvers;
