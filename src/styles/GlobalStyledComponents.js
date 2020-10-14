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
  :focus {
    outline: none;
  }
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

  input:focus,
  textarea:focus {
    outline: none;
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

export const StyledFormContent = styled.div`
  background: #2f3136;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 30%;
  padding: 2rem;
  box-shadow: 0 2px 4.1px -43px rgba(0, 0, 0, 0.101),
    0 4.7px 13.8px -43px rgba(0, 0, 0, 0.129),
    0 20px 62px -43px rgba(0, 0, 0, 0.18);

  border-radius: 6px;

  @media (max-width: 1540px) {
    width: 45%;
  }

  @media (max-width: 1045px) {
    width: 50%;
  }

  @media (max-width: 900px) {
    width: 65%;
  }

  @media (max-width: 620px) {
    width: 90%;
    padding: 0.5rem;
  }

  @media (orientation: landscape) and (min-device-width: 319px) and (max-device-width: 900px) {
    width: 70%;
  }
`;

export const StyledFormHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  h1 {
    margin-bottom: 0.5rem;
    @media (max-width: 620px) {
      margin: 0;
      padding: 0.5rem;
      font-size: 1.7rem;
    }
  }
`;

export const StyledFormBody = styled.div`
  padding: 1rem 1rem 0;

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0.7rem;
    margin: 0.3rem 0 0.5rem 0;
    border: 1px solid rgba(128, 127, 127, 0.2);
    border-radius: 6px;
    background: #18191b;
    color: #fff;
    font-size: 1rem;
  }

  p {
    text-align: center;
    margin-top: 1rem;
  }

  @media (max-width: 620px) {
    padding-bottom: 0.5rem;
  }
`;

export const StyledFormInputArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const StyledHr = styled.hr`
  margin: 1rem auto;
  border: none;
  background: #202225;
  height: 1px;
  width: 80%;
`;

export const StyledPasswordIcon = styled.i`
  position: absolute;
  bottom: 30%;
  right: 3%;
  color: #7d8088;
`;
