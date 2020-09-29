import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";

const StyledQuestionCard = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem 0 1rem 1rem;
  background: var(--card-background);
  flex-shrink: 0;
  position: relative;

  :nth-child(n + 2) {
    margin-top: 0.5rem;
  }
`;

const StyledQuestionBody = styled.div`
  padding: 0.5rem 0;
  font-size: 1rem;
  word-spacing: 0.03rem;
`;

const StyledQuestionFooter = styled.div`
  display: flex;
`;

const StyledMenuIcon = styled.i`
  ${(props) =>
    props.isOpen
      ? css`
          background-color: #18191b;
          color: #b3b3b3;
          padding: 1rem;
          position: absolute;
          top: ${(props) => (props.inList ? "-1rem" : "0")};
          right: 0;
          border-top-right-radius: 6px;
        `
      : css`
          padding: ${(props) => (props.inList ? "0 1rem" : "0")};
          color: #b3b3b3;
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
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const StyledQuestionTitle = styled.div`
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1rem;
`;

const StyledQuestionHeader = styled.div`
  display: flex;
  font-size: 0.9rem;
`;

const StyledQuestionText = styled.div`
  color: #dcddde;
  font-weight: 300;
  font-size: 1rem;
`;

const StyledName = styled.div`
  margin-right: 1rem;
  font-weight: 300;
  font-size: 0.92rem;
  color: var(--secondary-text);
`;

const StyledDate = styled.div`
  color: #7d8088;
`;

const StyledCommentCount = styled.div`
  color: var(--tertiary-text);
  font-size: 0.9rem;
`;

const StyledViewThreadDiv = styled.div`
  padding: 0 1rem 0;
  margin-left: auto;
`;

const StyledViewThreadLink = styled(Link)`
  color: #809bff;
  font-size: 0.9rem;
  font-family: "Roboto Slab", Times, serif;
  font-weight: 500;
`;

const StyledTruncate = styled(TextTruncate)`
  color: #dcddde;
  font-weight: 300;
  font-size: 1rem;
`;

export {
  StyledQuestionCard,
  StyledQuestionHeader,
  StyledQuestionBody,
  StyledName,
  StyledQuestionFooter,
  StyledMenuIcon,
  StyledAnswerIcon,
  StyledIconsDiv,
  StyledSpan,
  StyledThreadQuestion,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledDate,
  StyledCommentCount,
  StyledViewThreadDiv,
  StyledViewThreadLink,
  StyledIsAnsweredIcon,
  StyledTruncate,
};
