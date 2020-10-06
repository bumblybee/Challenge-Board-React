import styled from "styled-components";

export const StyledThreadLoader = styled.img`
  height: 120px;
  width: 120px;
  display: block;
  margin: auto;
`;

export const StyledThreadHeaderContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 3rem 1rem 0;

  button {
    /* margin-top: auto;
    margin-left: auto; */
    margin-right: 100%;
    margin-top: 1.5rem;
  }

  @media (max-width: 900px) {
    padding: 3rem 0.5rem 0;
  }

  @media (max-width: 620px) {
    margin: 0 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0;
    button {
      margin: 0.7rem 0 0;
    }
  }
`;
