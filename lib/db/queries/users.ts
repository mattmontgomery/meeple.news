import gql from "graphql-tag";

export default gql`
  query($jwt: Jwt, $email: Email) {
    userByJwt(jwt: $jwt, email: $email) {
      id
      roles
    }
  }
`;
