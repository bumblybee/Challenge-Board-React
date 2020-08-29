import styled, { css } from "styled-components";

const StyledMenuIcon = styled.i`
  ${(props) =>
    props.isOpen
      ? css`
          background: #18191b;
          padding: 1rem;
          position: absolute;
          top: 0;
          right: 0;
        `
      : css``}
`;

const StyledIconsDiv = styled.div`
  background: ${(props) => (props.isOpen ? "#18191b" : "#202225")};
`;

export { StyledMenuIcon, StyledIconsDiv };
