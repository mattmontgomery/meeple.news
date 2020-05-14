import gql from "graphql-tag";

export default gql`
  query {
    posts {
      id
      title
      thumbnail
      link
      placements
      publication
      submitted
    }
  }
`;

export const frontpagePosts = gql`
  query {
    posts(placement: frontpage) {
      title
      thumbnail
      link
      publication
      submitted
    }
  }
`;

export const linkPosts = gql`
  query {
    posts(placement: link) {
      title
      thumbnail
      link
      publication
      submitted
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $link: String
    $publication: String
    $submitted: Date
    $placements: [Placement]
    $thumbnail: String
  ) {
    updatePost(
      id: $id
      title: $title
      link: $link
      thumbnail: $thumbnail
      publication: $publication
      submitted: $submitted
      placements: $placements
    ) {
      id
      submitted
      title
      image
      thumbnail
      link
      publication
      placements
    }
  }
`;
