import styled, { css, keyframes } from "styled-components";

const StyledMenuIcon = styled.i`
  ${(props) =>
    props.isOpen
      ? css`
          background-color: #18191b;
          padding: 1rem;
          position: absolute;
          top: -1rem;
          right: 0;
          border-top-right-radius: 6px;
        `
      : css`
          padding: 0 1rem;
        `}
`;

const StyledIconsDiv = styled.div`
  position: relative;
  background: ${(props) => (props.isOpen ? "#18191b" : "#3a3c42")};
`;

export { StyledMenuIcon, StyledIconsDiv };
