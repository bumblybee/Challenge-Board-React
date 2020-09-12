import styled, { css } from "styled-components";

const StyledCommentsThread = styled.ul`
  background: #202225;
`;

const StyledCommentCard = styled.li`
  color: #dcddde;
  position: relative;
  padding: ${(props) => (props.answer ? "1rem 1rem 1rem 2rem" : "1rem")};
`;

const StyledIconsDiv = styled.div`
  ${(props) =>
    props.isOpen
      ? css`
          background: #18191b;
        `
      : css`
          margin-left: auto;
          background: ${(props) => (props.answer ? "#2f3136" : "#202225")};
        `}
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

const StyledAnswerIcon = styled.i`
  float: left;
  margin: 2.4rem 0 0 0.5rem;
  color: #6271c0;
`;

const StyledTimeDiv = styled.div`
  margin-right: 1rem;
  color: #7d8088;
`;

const StyledDateDiv = styled.div`
  color: #7d8088;
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

const StyledCommentText = styled.div`
  color: #dcddde;
  font-weight: 300;
`;

const StyledCommentsForm = styled.form`
  background: #18191b;
  display: flex;
  padding: 1rem;
`;

const StyledSubmitButton = styled.button`
  margin-left: auto;
  border: none;
  background: #18191b;
`;

export {
  StyledCommentsThread,
  StyledCommentCard,
  StyledMenuIcon,
  StyledAnswerIcon,
  StyledIconsDiv,
  StyledTimeDiv,
  StyledDateDiv,
  StyledSpan,
  StyledCommentText,
  StyledSubmitButton,
  StyledCommentsForm,
};
