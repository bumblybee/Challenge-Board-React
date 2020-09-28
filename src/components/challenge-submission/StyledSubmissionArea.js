import styled from "styled-components";

const StyledModalBody = styled.div`
  height: 10rem;

  width: 110%;
`;

const StyledTimestampParagraph = styled.p`
  color: #7d8088;
  margin-top: auto;
  margin-bottom: 0.5rem;
  font-weight: 400;
  font-size: 1rem;
`;

const StyledConfirmationH1 = styled.h1`
  margin-top: 24%;
  @media (max-width: 600px) {
    margin-top: 40%;
  }
`;

const StyledConfirmationParagraph = styled.p`
  padding-top: 8px;
`;

export {
  StyledModalBody,
  StyledTimestampParagraph,
  StyledConfirmationH1,
  StyledConfirmationParagraph,
};
