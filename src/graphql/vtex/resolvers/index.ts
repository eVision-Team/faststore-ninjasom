import { buyTogetherResolver } from "./buyTogether";
import { productResolver } from "./product";
import { productRefId } from "./productRefId";

const resolvers = {
  Query: {
    ...productResolver,
    ...buyTogetherResolver,
    ...productRefId,
  },
  Mutation: {},
};

export default resolvers;
