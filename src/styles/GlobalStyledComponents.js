import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeading = styled.h4`
  font-weight: 300;
  color: #dcddde;

  @media (max-width: 620px) {
    font-size: 0.8rem;
  }
`;

export const StyledTransparentButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  margin: 0 1rem 0.5rem 0;
  :hover {
    cursor: pointer;
  }
`;

export const StyledPurpleButton = styled.button`
  margin-top: 1rem;
  background: #6271c0;
  color: #fff;
  padding: 8px 15px;
  border-radius: 6px;
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

  @media (max-width: 620px) {
    font-size: 0.95rem;
  }
`;

export const StyledTextarea = styled.textarea`
  resize: none;
`;

export const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

export const StyledFormLink = styled(Link)`
  color: #809bff;
  font-size: 0.9rem;
  font-family: "Roboto Slab", Times, serif;
  font-weight: 400;
  text-align: center;
  margin-top: 1rem;
  display: block;
`;

export const StyledDiscordButton = styled.a`
  background: #6271c0;
  display: block;
  width: 100%;
  color: #fff;
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  font-size: 0.95rem;
  font-family: "Roboto Slab", serif;
  font-weight: 300;
  text-align: center;
  margin-top: 1rem;
  position: relative;
  :hover {
    background: #809bff;
  }
`;

export const StyledDiscordIcon = styled.i`
  position: absolute;
  opacity: 0.3;
  left: 47%;
  top: 2px;
`;
