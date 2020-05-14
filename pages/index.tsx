import { withApollo } from "../apollo/client";
import { frontpagePosts } from "@db/queries/posts";
import Post from "@components/Post";
import styled from "@emotion/styled";
import { GetStaticProps } from "next";
import ApolloClient from "apollo-client";
import { Post as IPost } from "../lib/interfaces";

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

const Index = ({ data }) => {
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

Index.getInitialProps = async (context: {
  apolloClient: ApolloClient<{ posts: IPost }>;
}) => {
  return await context.apolloClient.query({ query: frontpagePosts });
};

export default withApollo(Index);
