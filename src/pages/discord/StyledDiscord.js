import styled from "styled-components";

const StyledDiscordButton = styled.a`
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

const StyledDiscordDiv = styled.div`
  margin: 15% auto;
  width: 80%;
`;

export { StyledDiscordDiv, StyledDiscordButton };
