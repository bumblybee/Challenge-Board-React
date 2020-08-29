import styled, { css } from "styled-components";

const StyledErrorMsg = styled.div`
  color: #f77;
  text-align: center;
  font-size: 1.1rem;
  background: #000;
  padding: 1rem;
  margin: 0 auto;
  width: 70%;
  border-radius: 6px;
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

const StyledAccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 80%;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
  background-color: #2f3136;
  height: 85vh;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035);
`;

const StyledAccountPostsDiv = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 1rem;
  overflow-y: auto;
  border-radius: 6px;
`;

const StyledAccountPost = styled.li`
  width: 80%;
  margin: 0 auto;

  padding: 1rem;
  background: #3a3c42;
  margin-top: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4.5px 5.3px rgba(0, 0, 0, 0.028);
  transition: transform 0.1s ease-in;
  :hover {
    cursor: pointer;
    transform: scale(0.99);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }
`;

const StyledTransparentButton = styled.button`
  background: transparent;
`;

const StyledPurpleButton = styled.button`
  margin-top: 1rem;
  background: #6271c0;
  color: #fff;
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  font-size: 0.95rem;
  font-family: "Roboto Slab", serif;
  font-weight: 300;
  text-align: center;
  ${(props) =>
    props.editButton &&
    css`
      margin-right: 1rem;
    `}
`;

export {
  StyledErrorMsg,
  StyledSpan,
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledTransparentButton,
  StyledPurpleButton,
};
