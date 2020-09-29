import styled from "styled-components";

export const StyledModalBody = styled.div`
  height: 10rem;
  width: 100%;
  @media (max-width: 620px) {
    height: 5rem;
    padding: 0 0.5rem;
  }
`;

export const StyledTimestampParagraph = styled.p`
  color: #7d8088;
  margin-top: auto;
  margin-bottom: 0.5rem;
  font-weight: 400;
  font-size: 1rem;
`;

export const StyledConfirmationH1 = styled.h1`
  margin-top: 23%;

  @media (max-width: 620px) {
    margin-top: 20%;
  }
`;

export const StyledConfirmationParagraph = styled.p`
  padding-top: 8px;
`;
