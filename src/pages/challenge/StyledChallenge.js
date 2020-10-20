import styled from "styled-components";

export const StyledChallengeLoader = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
`;

export const StyledContainer = styled.div`
  width: 80%;
  margin: 3rem auto;
  min-height: 800px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;

  @media (max-width: 1540px) {
    width: 90%;
  }

  @media (max-width: 1045px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 620px) {
    margin: 1rem 0 0;
    width: 100%;
    min-height: auto;
  }
`;

export const StyledChallengeSubmissionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  ${"" /* max-height: 900px; */}

  > div:first-child {
    margin-bottom: 1rem;
  }

  @media (max-width: 620px) {
    height: 100%;
    > div:first-child {
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;
