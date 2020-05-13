import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String
    displayName: String
    status: String!
  }

  type Query {
    frontPagePosts: [Post]
    users: [User]
  }

  scalar Date

  type Post {
    submittedBy: User
    submittedTime: Date
    title: String!
    image: String
    thumbnail: String
    link: String
    publication: String
  }
`;
