import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({
  schema,
  context: (context) => ({
    token: (context.req.headers.authorization || "").replace("Bearer ", ""),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({ path: "/api/graphql" });

export default server;
