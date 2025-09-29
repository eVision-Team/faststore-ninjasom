import categoriesResolver from "./categories";

const resolvers = {
  Query: {
    ...categoriesResolver,
  },
  Mutation: {},
};

export default resolvers;
