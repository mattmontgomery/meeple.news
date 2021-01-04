import React from "react";
import Document, { Html, Main, NextScript } from "next/document";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import styled from "@emotion/styled";
import Head from "next/head";

const Body = styled.body`
  margin: 1rem;
  font-family: Jost, Arial;
`;

const BodyTitle = styled.h1`
  font-weight: 800;
`;
const BodySubtitle = styled.h2`
  display: flex;
  font-weight: 300;
  font-size: 14pt;
  align-items: center;
  a {
    text-decoration: none;
    color: #303030;
  }
  svg {
    width: 1rem;
    margin-right: 0.5rem;
    position: relative;
    top: 2px;
  }
`;
const BodyHeader = styled.header`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const BodyFooter = styled.footer`
  margin-top: 2rem;
  font-size: 10pt;
  background: #f0f3f0;
  padding: 1rem;
  font-weight: 300;
  strong {
    font-weight: 500;
    margin-right: 1rem;
  }
  a {
    margin-right: 1rem;
    text-decoration: none;
    color: initial;
  }
`;

export default class App extends Document {
  render() {
    return (
      <Html lang="en">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;500;800&display=swap"
        />
        <Head>
          <title>meeple.news | news on board games and card games</title>
        </Head>
        <Body>
          <BodyHeader>
            <BodyTitle>meeple.news</BodyTitle>
            <BodySubtitle>
              <a href="https://instagram.com/donteatthemeeples">
                <FontAwesomeIcon icon={faInstagram} size="xs" />
              </a>
              <a href="https://instagram.com/donteatthemeeples">
                {"donteatthemeeples"}
              </a>
            </BodySubtitle>
          </BodyHeader>
          <Main />
          <NextScript />
          <BodyFooter>
            <strong>{"Navigation "}</strong>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/links">
              <a>Instagram Bio Links</a>
            </Link>
            <a href="https://www.instagram.com/donteatthemeeples">
              {"@donteatthemeeples"}
            </a>
          </BodyFooter>
        </Body>
      </Html>
    );
  }
}
