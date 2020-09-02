import styled, { css } from "styled-components";

const StyledTransparentButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  margin: 0 1rem 0.5rem 0;
  :hover {
    cursor: pointer;
  }
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

  :hover {
    cursor: pointer;
    background: #809bff;
  }
`;

const StyledError = styled.div`
  color: #f77;
  text-align: center;
  font-size: 1.1rem;
  background: #000;
  padding: ${(props) => (props.discordError === true ? "4rem" : "1rem")};
  margin: 0 auto;
  width: 70%;
  border-radius: 6px;
  z-index: 100;
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

export { StyledSpan, StyledError, StyledTransparentButton, StyledPurpleButton };
