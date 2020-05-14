import { withApollo } from "../apollo/client";
import { frontpagePosts } from "../lib/queries/posts";
import Post from "../lib/components/Post";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { GetStaticProps } from "next";

const App = styled.section``;

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  @media (min-width: 65rem) {
    grid-template-columns: repeat(3, minmax(400px, 800px));
  }
`;

const Index = () => {
  const { data } = useQuery(frontpagePosts);
  // useLazyQuery(FrontPagePostsQuery);
  return (
    <App>
      <PostsWrapper>
        {(data.posts || []).map((post, idx) => (
          <Post key={idx} {...post} />
        ))}
      </PostsWrapper>
    </App>
  );
};

Index.getStaticProps = async (context) => {
  return await context.apolloClient.query({ query: frontpagePosts });
};

export default withApollo(Index);
