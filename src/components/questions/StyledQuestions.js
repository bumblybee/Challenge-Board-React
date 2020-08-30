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

const StyledAnswerIcon = styled.i`
  float: left;
  margin: 2.4rem 0 0 0.5rem;
  color: #6271c0;
`;

const StyledIsAnsweredIcon = styled.i`
  margin-right: 1rem;
`;

const StyledIconsDiv = styled.div`
  position: relative;
  margin-left: auto;
  background: ${(props) => (props.isOpen ? "#18191b" : "#3a3c42")};
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

const StyledThreadQuestion = styled.div`
  background: #3a3c42;
  padding: 1rem;
  position: relative;
`;

const StyledQuestionTitle = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
  color: #fff;
`;

const StyledQuestionText = styled.div`
  color: #dcddde;
  font-weight: 300;
`;

const StyledDateDiv = styled.div`
  color: #7d8088;
`;

const StyledViewThreadDiv = styled.div`
  padding: 0 1rem 0;
`;

export {
  StyledMenuIcon,
  StyledAnswerIcon,
  StyledIconsDiv,
  StyledSpan,
  StyledThreadQuestion,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledDateDiv,
  StyledViewThreadDiv,
  StyledIsAnsweredIcon,
};
