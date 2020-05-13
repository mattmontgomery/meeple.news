import { GraphQLScalarType, Kind } from "graphql";

import postsResolver, { PostOptionsWhere } from "./resolvers/posts";
import usersResolver from "./resolvers/users";

export const resolvers = {
  Query: {
    posts: async (_, args, __, ___) => {
      // console..log(parent, args, context, info);

      return await postsResolver({
        where: {
          field: "placements",
          value: args.placement
            ? args.placement.toLowerCase()
            : ["frontpage", "link"],
          op: args.placement ? "array-contains" : "array-contains-any",
        } as PostOptionsWhere,
      });
    },
    users: usersResolver,
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue: (value) => new Date(value),
    serialize: (value) => value.getTime(),
    parseLiteral: (ast) =>
      ast.kind === Kind.INT ? parseInt(ast.value, 10) : null,
  }),
};
