import { GraphQLScalarType, Kind } from "graphql";

import postsResolver from "./resolvers/posts";
import usersResolver from "./resolvers/users";

export const resolvers = {
  Query: {
    frontPagePosts: postsResolver,
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
