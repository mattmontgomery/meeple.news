import gql from "graphql-tag";

export default gql`
  query {
    posts {
      title
      thumbnail
      link
      publication
      submitted
      submittedBy {
        displayName
      }
    }
  }
`;

export const frontpagePosts = gql`
  query {
    posts(placement: FRONTPAGE) {
      title
      thumbnail
      link
      publication
      submitted
      submittedBy {
        displayName
      }
    }
  }
`;

export const linkPosts = gql`
  query {
    posts(placement: LINK) {
      title
      thumbnail
      link
      publication
      submitted
      submittedBy {
        displayName
      }
    }
  }
`;
