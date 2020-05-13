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
    linkPosts: [Post]
    posts(placement: Placement): [Post]
    users: [User]
    getPosts: [Post]
  }

  scalar Date
  enum Placement {
    LINK
    FRONTPAGE
  }

  query Posts($placements: Placement) {
    posts(placements: $placements)
  }

  type Post {
    id: String
    submittedBy: User
    submitted: Date
    title: String!
    image: String
    thumbnail: String
    link: String
    publication: String
    placements: [String]
  }
`;
