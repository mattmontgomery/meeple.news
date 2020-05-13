import React from "react";

import styled from "@emotion/styled";
import { Post as IPost } from "../interfaces";

const PostWrapper = styled.a`
  padding: 1rem;
  background-color: #fafaff;
  text-decoration: none;
  color: initial;
  text-align: center;
  img {
    max-width: 100%;
  }
`;
const PostTitle = styled.h2`
  margin: 0;
  font-weight: 500;
`;
const PostPublication = styled.h4`
  margin: 0;
  font-weight: 300;
`;

export default function Post(props: IPost) {
  return (
    <PostWrapper href={props.link}>
      <img src={props.thumbnail} alt={props.title} />
      <PostPublication>{props.publication}</PostPublication>
      <PostTitle>{props.title}</PostTitle>
    </PostWrapper>
  );
}
