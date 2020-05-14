import React from "react";

import styled from "@emotion/styled";

export default styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  @media (min-width: 45rem) {
    grid-template-columns: repeat(2, minmax(400px, 800px));
  }
  @media (min-width: 65rem) {
    grid-template-columns: repeat(3, minmax(400px, 800px));
  }
  @media (min-width: 125rem) {
    grid-template-columns: repeat(4, minmax(400px, 800px));
  }
`;
