import gql from "graphql-tag";

export default gql`
  query {
    frontPagePosts {
      title
      thumbnail
      link
      publication
      submittedBy {
        displayName
      }
    }
  }
`;
