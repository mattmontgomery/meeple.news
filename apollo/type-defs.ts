import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String
    name: String
    displayName: String
    status: String!
    authDomain: String
    roles: [Roles]
    jwt: String
  }

  type Query {
    frontPagePosts: [Post]
    linkPosts: [Post]
    posts(placement: Placement): [Post]
    userByJwt(jwt: Jwt, email: Email): User
    users: [User]
    getPosts: [Post]
  }

  scalar Date
  scalar Jwt
  scalar Email
  enum Placement {
    link
    frontpage
  }
  enum Roles {
    admin
  }

  type Post {
    id: ID!
    submitted: Date
    title: String!
    image: String
    thumbnail: String
    link: String
    publication: String
    placements: [String]
  }

  type Mutation {
    updatePost(
      id: ID!
      title: String
      publication: String
      submitted: Date
      placements: [Placement]
      thumbnail: String
      link: String
    ): Post
  }
`;
