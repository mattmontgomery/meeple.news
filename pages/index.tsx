import { withApollo } from "../apollo/client";
import FrontPagePostsQuery from "../lib/queries/frontPagePosts";
import Post from "../lib/components/Post";
import styled from "@emotion/styled";

const App = styled.section``;

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-column-gap: 1rem;
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(400px, 800px));
  }
`;

const Index = ({ data }) => {
  return (
    <App>
      <PostsWrapper>
        {(data.frontPagePosts || []).map((post, idx) => (
          <Post key={idx} {...post} />
        ))}
      </PostsWrapper>
    </App>
  );
};

Index.getInitialProps = async (context) => {
  return await context.apolloClient.query({ query: FrontPagePostsQuery });
};

export default withApollo(Index);
