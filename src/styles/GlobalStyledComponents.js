import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

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
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

const StyledTextarea = styled.textarea`
  resize: none;
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;
const StyledFormLink = styled(Link)`
  color: #809bff;
  font-size: 1rem;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
  display: block;
`;

export {
  StyledSpan,
  StyledFormLink,
  StyledTransparentButton,
  StyledPurpleButton,
  StyledTextarea,
};
