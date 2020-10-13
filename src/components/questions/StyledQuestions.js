import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";

export const StyledQuestionsLoader = styled.img`
  height: 120px;
  width: 120px;
  display: block;
  margin: auto;
`;

export const StyledQuestionArea = styled.div`
  background: var(--secondary-background);
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 900px;
  flex-grow: 1;

  @media (max-width: 1045px) {
    overflow: visible;
    margin-bottom: 1rem;
  }

  @media (max-width: 620px) {
    margin: 0 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0;
    width: 100%;
    height: auto;
  }
`;

export const StyledDiscussionHeaderContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-bottom: 1rem;
  padding: 3rem 1rem 0;

  button {
    margin-top: auto;
    margin-left: auto;
  }

  @media (max-width: 900px) {
    padding: 3rem 0.5rem 0;
  }

  @media (max-width: 620px) {
    margin: 0 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0;
  }
`;

export const StyledQuestionsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 1.32rem;
  }

  ::-webkit-scrollbar-track {
    background: #18191b;
    border-top-right-radius: 6px;
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

export const StyledQuestionList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const StyledQuestionCard = styled.li`
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

export const StyledQuestionBody = styled.div`
  padding: 0.5rem 0;
  font-size: 1rem;
  word-spacing: 0.03rem;
`;

export const StyledQuestionFooter = styled.div`
  display: flex;
`;

export const StyledMenuIcon = styled.i`
  ${(props) =>
    props.menuOpen
      ? css`
          background-color: #18191b;
          color: #b3b3b3;
          padding: 1rem;
          position: absolute;
          top: ${(props) => (props.inList ? "-1rem" : "-1rem")};
          right: ${(props) => (props.inList ? "-0" : "-1rem")};
          border-top-right-radius: 6px;
        `
      : css`
          padding: ${(props) => (props.inList ? "0 1rem" : "0")};
          color: #b3b3b3;
        `}
`;

export const StyledAnswerIcon = styled.i`
  float: left;
  margin: 2.4rem 0 0 0.5rem;
  color: #6271c0;
`;

export const StyledIsAnsweredIcon = styled.i`
  margin-right: 1rem;
`;

export const StyledIconsDiv = styled.div`
  position: relative;
  margin-left: auto;
  background: ${(props) => (props.menuOpen ? "#18191b" : "#3a3c42")};
`;

export const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

export const StyledThreadQuestion = styled.div`
  background: #3a3c42;
  padding: 1rem;
  position: relative;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const StyledQuestionTitle = styled.div`
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1rem;
`;

export const StyledQuestionHeader = styled.div`
  display: flex;
  font-size: 0.9rem;
`;

export const StyledQuestionText = styled.div`
  color: #dcddde;
  font-weight: 300;
  font-size: 1rem;
`;

export const StyledName = styled.div`
  margin-right: 1rem;
  font-weight: 300;
  font-size: 0.92rem;
  color: var(--secondary-text);
`;

export const StyledDate = styled.div`
  color: #7d8088;
`;

export const StyledCommentCount = styled.div`
  color: var(--tertiary-text);
  font-size: 0.9rem;
`;

export const StyledViewThreadDiv = styled.div`
  padding: 0 1rem 0;
  margin-left: auto;
`;

export const StyledViewThreadLink = styled(Link)`
  color: #809bff;
  font-size: 0.9rem;
  font-family: "Roboto Slab", Times, serif;
  font-weight: 500;
`;

export const StyledTruncate = styled(TextTruncate)`
  color: #dcddde;
  font-weight: 300;
  font-size: 1rem;
`;
