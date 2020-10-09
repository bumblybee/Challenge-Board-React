import styled, { css } from "styled-components";
import TextTruncate from "react-text-truncate";
import TextareaAutosize from "react-autosize-textarea";

export const StyledCommentsThread = styled.ul`
  background: #202225;
  /* padding: ${(props) => (props.hasComments ? "0.8rem 0" : "0")}; */
`;

export const StyledCommentsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  ::-webkit-scrollbar {
    width: 1.32rem;
  }

  ::-webkit-scrollbar-track {
    background: #18191b;
    border-bottom-right-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--card-background);
    border: 4px solid transparent;
    border-radius: 10px;
    background-clip: content-box;
  }

  @media (max-width: 1045px) {
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

export const StyledCommentCard = styled.li`
  color: #dcddde;
  position: relative;
  padding: ${(props) => (props.answer ? "1rem 1rem 1rem 2rem" : "1rem")};
`;

export const StyledIconsDiv = styled.div`
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

export const StyledMenuIcon = styled.i`
  ${(props) =>
    props.isOpen
      ? css`
          background: #18191b;
          color: #b3b3b3;
          padding: 1rem;
          position: absolute;
          top: 0;
          right: 0;
        `
      : css`
          color: #b3b3b3;
        `}
`;

export const StyledAnswerIcon = styled.i`
  float: left;
  margin: 2.2rem 0.7rem 0 0.5rem;
  color: #6271c0;
`;

export const StyledTimeDiv = styled.div`
  margin-right: 1rem;
  color: #7d8088;
`;

export const StyledDateDiv = styled.div`
  color: #7d8088;
`;

export const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

export const StyledCommentText = styled.div`
  color: #dcddde;
  font-weight: 300;
  white-space: pre-wrap;
`;

export const StyledCommentsForm = styled.form`
  background: #18191b;
  display: flex;
  padding: 1rem;
`;

export const StyledTextarea = styled(TextareaAutosize)`
  background: #18191b;
  border: none;
  outline: none;
  color: #fff;
  width: 80%;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  resize: none;
`;

export const StyledSubmitButton = styled.button`
  ${(props) =>
    props.isTyping
      ? css`
          margin-left: auto;
          border: none;
          background: #809bff;
          border-radius: 6px;
          width: 40px;
          height: 30px;
          text-align: center;
        `
      : css`
          margin-left: auto;
          border: none;
          background: #18191b;
        `}
  :focus {
    outline: none;
  }
`;

export const StyledSubmitIcon = styled.i`
  ${(props) =>
    props.isTyping
      ? css`
          color: #fff;
        `
      : css`
          color: #7d8088;
        `}
  :hover {
    cursor: pointer;
  }
`;

export const StyledTruncate = styled(TextTruncate)`
  color: #dcddde;
  font-weight: 300;
  white-space: pre-wrap;
`;
