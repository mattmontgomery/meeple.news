import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import styled from "@emotion/styled";

const StyledBody = styled.body`
  font-family: "Jost";
  margin: 1rem;
`;

const BodyTitle = styled.h1`
  font-weight: 800;
`;

export default class App extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Jost:wght@300;500;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <StyledBody>
          <BodyTitle>meeple.news</BodyTitle>
          <Main />
          <NextScript />
        </StyledBody>
      </Html>
    );
  }
}
