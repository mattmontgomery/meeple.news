import { withApollo } from "../apollo/client";
import { linkPosts } from "../lib/queries/posts";
import Post from "../lib/components/Post";
import styled from "@emotion/styled";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
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

interface Data {
  posts: IPost[];
}

const Links = () => {
  const { data } = useQuery(linkPosts);
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

Links.getStaticProps = async (context: {
  apolloClient: ApolloClient<{ posts: IPost }>;
}) => {
  return await context.apolloClient.query({ query: linkPosts });
};

export default withApollo(Links);
