import { buyTogetherResolver } from "./buyTogether";
import { collectionResolver } from "./collection";
import { productResolver } from "./product";
import { productRefId } from "./productRefId";
import { seoResolver } from "./seo";

const resolvers = {
  Query: {
    ...productResolver,
    ...buyTogetherResolver,
    ...productRefId,
    ...collectionResolver,
  },
  Mutation: {},
  StoreProduct: {
    ...seoResolver.StoreProduct,
  },
};

export default resolvers;
