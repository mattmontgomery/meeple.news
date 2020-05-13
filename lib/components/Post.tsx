import React from "react";

import styled from "@emotion/styled";
import { Post as IPost } from "../interfaces";
import DateHelper from "./DateHelper";

const PostWrapper = styled.a`
  padding: 1rem;
  background-color: #fafaff;
  text-decoration: none;
  color: initial;
  text-align: left;
  img {
    width: 100%;
  }
`;
const PostTitle = styled.h2`
  margin: 0;
  font-weight: 500;
`;
const PostPublication = styled.h4`
  margin: 0;
  font-weight: inherit;
`;
const PostDate = styled.div``;
const PostDetails = styled.div`
  font-size: 11pt;
  display: grid;
  grid-template-columns: 1fr auto;
  font-weight: 300;
  margin: 0.25rem 0;
`;

export default function Post(props: IPost) {
  return (
    <PostWrapper href={props.link}>
      <img src={props.thumbnail} alt={props.title} />
      <PostDetails>
        <PostDate>
          <DateHelper date={props.submitted} />
        </PostDate>
        <PostPublication>{props.publication}</PostPublication>
      </PostDetails>
      <PostTitle>{props.title}</PostTitle>
    </PostWrapper>
  );
}
