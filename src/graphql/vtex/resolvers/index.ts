import { buyTogetherResolver } from "./buyTogether";
import { collectionResolver } from "./collection";
import { productResolver } from "./product";
import { productRefId } from "./productRefId";

const resolvers = {
  Query: {
    ...productResolver,
    ...buyTogetherResolver,
    ...productRefId,
    ...collectionResolver,
  },
  Mutation: {},
};

export default resolvers;
