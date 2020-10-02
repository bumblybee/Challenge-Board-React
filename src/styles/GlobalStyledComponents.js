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
    cursor: pointer;
  }
`;

export const StyledDiscordIcon = styled.i`
  position: absolute;
  opacity: 0.3;
  left: 47%;
  top: 2px;
`;

export const StyledModalHeader = styled.div`
  padding: 1rem 1rem 0;

  p {
    font-weight: 300;
  }

  h1 {
    font-size: 1.5rem;
  }
`;

export const StyledModalBody = styled.div`
  padding: 1rem 1rem 0;

  form {
    display: flex;
    flex-direction: column;
  }

  input,
  textarea {
    padding: 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(128, 127, 127, 0.2);
    border-radius: 6px;
    background: #18191b;
    color: #fff;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  color: #fff;
  margin: 0.5rem 0.5rem 0 0;
  background: transparent;

  @media (max-width: 620px) {
    padding-bottom: 0.5rem;
    margin: 0;
  }
`;
