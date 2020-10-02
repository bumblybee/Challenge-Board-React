import styled from "styled-components";

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

export const StyledHr = styled.hr`
  margin: 1rem auto;
  border: none;
  background: #202225;
  height: 1px;
  width: 80%;
`;

export const StyledDiscordIcon = styled.i`
  position: absolute;
  opacity: 0.3;
  left: 47%;
  top: 2px;
`;
