import styled from "styled-components";

export const StyledChallengeContainer = styled.div`
  background: var(--secondary-background);
  padding: 2.9rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.05),
    0 6.7px 5.3px rgba(0, 0, 0, 0.06), 0 12.5px 10px rgba(0, 0, 0, 0.07);
  margin-right: 1rem;
  font-weight: 300;
  flex-grow: 1;

  @media (max-width: 1045px) {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 100%;
  }

  @media (max-width: 620px) {
    padding: 1rem;
    border-radius: 0;
  }
`;

export const StyledChallengeHeader = styled.div`
  h1 {
    color: #fff;
  }
`;

export const StyledVideo = styled.iframe`
  margin: 1.5rem 0 1rem;
  width: 100%;
  height: 400px;

  @media (max-width: 1540px) {
    height: 395px;
  }

  @media (max-width: 1540px) {
    height: 360px;
  }
  @media (max-width: 620px) {
    height: 220px;
    margin-bottom: 0.5rem;
  }
`;
