import { buyTogetherResolver } from "./buyTogether";
import { collectionResolver } from "./collection";
import { productResolver } from "./product";
import { productRefId } from "./productRefId";
import { seoResolver } from "./seo";
import { stockNotificationResolver } from "./stockNotification";

const resolvers = {
  Query: {
    ...productResolver,
    ...buyTogetherResolver,
    ...productRefId,
    ...collectionResolver,
  },
  Mutation: {
    ...stockNotificationResolver,
  },
  StoreProduct: {
    ...seoResolver.StoreProduct,
  },
};

export default resolvers;
