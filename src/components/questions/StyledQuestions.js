import styled, { css } from "styled-components";

const StyledMenuIcon = styled.i`
  ${(props) =>
    props.isOpen
      ? css`
          background-color: #18191b;
          padding: 1rem;
          position: absolute;
          top: ${(props) => (props.inList ? "-1rem" : "0")};
          right: 0;
          border-top-right-radius: 6px;
        `
      : css`
          padding: ${(props) => (props.inList ? "0 1rem" : "0")};
        `}
`;

const StyledIconsDiv = styled.div`
  position: relative;
  background: ${(props) => (props.isOpen ? "#18191b" : "#3a3c42")};
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

export { StyledMenuIcon, StyledIconsDiv, StyledSpan };
