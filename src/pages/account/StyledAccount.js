import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const StyledDashboardHeader = styled.h1`
  padding: 1rem;
  color: #dcdddefb;
  /* text-shadow: 0 2px 14px #809bffee; */
  font-family: "Roboto Slab", serif;
  font-size: 1.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 620px) {
    font-size: 1.5rem;
    padding: 1rem 0.7rem;
  }
`;

export const StyledButton = styled.div`
  height: 40px;
  width: 40px;

  border-radius: 50%;
  transition: transform 0.5s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ease-out;
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    props.power
      ? css`
          box-shadow: 0 -1px 12px #809bff8e, 0 1px 6px rgba(0, 0, 0, 0.2);
          background: #95acffee;
          transform: scale(0.98);
          font-size: 1.45rem;
          border-top: 0.5px solid #738ce466;
          border-bottom: 3px solid #738ce4;
          border-left: 1.2px solid #738ce4;
          border-right: 1.2px solid #738ce4;
        `
      : css`
          box-shadow: inset 0 -2px 6px rgba(0, 0, 0, 0.2),
            0 0 6px rgba(0, 0, 0, 0.2);
          background: #809bff;
          transform: scale(1);
          font-size: 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 3px solid rgba(0, 0, 0, 0.2);
          border-left: 1.5px solid rgba(0, 0, 0, 0.18);
          border-right: 1.5px solid rgba(0, 0, 0, 0.18);
        `}

  :hover {
    cursor: pointer;
  }

  :active {
    border: none;
    box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.4),
      inset 0 -1px 2px rgba(0, 0, 0, 0.7);
    font-size: 1.45rem;
  }

  :focus {
    outline: none;
  }

  @media (max-width: 620px) {
    height: 36px;
    width: 36px;
    font-size: 1.25rem;

    :active {
      font-size: 1.21rem;
    }
  }
`;

export const StyledPowerIcon = styled.i`
  color: ${(props) => (props.power ? "#fff" : "#fffa")};
`;

export const StyledCategoryH3 = styled.h3`
  color: #809bffee;
  font-family: "Roboto", serif;
  font-size: 1.7rem;
  padding: 0.5rem 0 0.5rem;
  border-bottom: 4px solid #809bffee;
  text-shadow: 0 0 10px #809cff5b;
  @media (max-width: 620px) {
    font-size: 1.3rem;
  }
`;

export const StyledQuestionTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
`;

export const StyledLink = styled(Link)`
  color: #fff;
`;

export const StyledHashLink = styled(HashLink)`
  color: #fff;
`;

export const StyledAccountDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 80%;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
  background-color: #3a3c42;
  height: 85vh;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035);

  @media (max-width: 900px) and (orientation: landscape) {
    width: 96%;
    margin: 1rem auto;
    height: 100%;
  }

  @media (max-width: 620px) {
    width: 96%;
    margin: 1rem auto;
    height: 90vh;
  }
`;

export const StyledAccountPostsDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  padding: 0.9rem;
  background: #2f3136;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  border-style: inset;
  border-width: 12px;
  border-top-color: rgba(0, 0, 0, 0.03);
  border-left-color: rgba(0, 0, 0, 0.03);
  border-right-color: #3a3c42;
  border-bottom-color: #3a3c42;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0.4rem;
    border-width: 8px;
    display: block;
  }
`;

export const StyledPostList = styled.ul`
  padding: 0 0 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border-left: 5px solid #809bffee;
  border-top: 5px solid #809bffee;
  border-bottom: 5px solid #809bffee;
  border-right: 5px solid #809bffee;
  box-shadow: 0 0 10px #809cff3b, -1px -1px 4px #809cff3b, 0 0 8px #809cff3b;
  display: ${(props) => (props.power ? "block" : "none")};

  :not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  :not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media (max-width: 1024px) {
    border-right: 4px solid #809bffee;

    padding: 0;
    margin-bottom: 0;

    :first-child {
      border-top-right-radius: 6px;
      border-bottom-left-radius: 0;
    }

    :last-child {
      border-bottom-left-radius: 6px;
    }

    :not(:first-child) {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-left: 4px solid #809bffee;
    }

    :not(:last-child) {
      border-bottom: none;
    }
  }

  @media (max-width: 620px) {
    padding: 0;
    height: auto;
  }
`;

export const StyledAccountPost = styled.li`
  margin: 0 auto;
  padding: 1rem;

  text-align: ${(props) => (props.noLength ? "center" : "left")};

  transition: transform 0.1s ease-in;
  :hover {
    cursor: ${(props) => (props.noLength ? "default" : "pointer")};
    /* transform: ${(props) => (props.noLength ? "" : "scale(0.99)")};
    box-shadow: ${(props) =>
      props.noLength ? "" : "inset 0 0 10px rgba(0, 0, 0, 0.3);"}; */
    filter: ${(props) => (props.noLength ? "" : "brightness(75%)")};
  }

  p {
    font-weight: 300;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin: 0 auto;

    :not(:last-of-type) {
      border-bottom: 0.5px inset #fff;
    }
  }
`;

export const StyledAnchorWrapper = styled.a`
  color: #fff;
`;

export const StyledHr = styled.hr`
  display: none;
  @media (max-width: 620px) {
    border: 0.5px inset transparent;

    display: block;
    margin: 0 auto;
  }
`;

export const StyledDate = styled.div`
  color: #7d8088;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
`;

export const StyledFilter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100;
  height: 100%;
  backdrop-filter: saturate(130%);
`;
