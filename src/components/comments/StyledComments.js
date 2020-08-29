import styled, { css } from "styled-components";

const StyledCommentCard = styled.li`
  color: #dcddde;
  position: relative;
  padding: ${(props) => (props.answer ? "1rem 1rem 1rem 2rem" : "1rem")};
`;

const StyledIconsDiv = styled.div`
  background: ${(props) => (props.isOpen ? "#18191b" : "#202225")};
`;

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

const StyledTimeDiv = styled.div`
  margin-right: 1rem;
  color: #7d8088;
`;

const StyledDateDiv = styled.div`
  color: #7d8088;
`;

export {
  StyledCommentCard,
  StyledMenuIcon,
  StyledIconsDiv,
  StyledTimeDiv,
  StyledDateDiv,
};
