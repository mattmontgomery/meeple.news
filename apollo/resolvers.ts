import { GraphQLScalarType, Kind } from "graphql";

import postsResolver, {
  PostOptionsWhere,
  updatePostResolver,
} from "./resolvers/posts";
import usersResolver, { usersJwtResolver } from "./resolvers/users";

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
    userByJwt: async (_, args) => {
      return await usersJwtResolver({
        jwt: args.jwt,
        email: args.email,
      });
    },
  },
  Mutation: {
    updatePost: updatePostResolver,
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue: (value) => new Date(parseInt(value, 10)),
    serialize: (value) => (typeof value === "number" ? value : value.getTime()),
    parseLiteral: (ast) =>
      ast.kind === Kind.INT ? parseInt(ast.value, 10) : null,
  }),
};
