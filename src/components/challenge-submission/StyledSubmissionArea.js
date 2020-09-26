import styled from "styled-components";

const StyledModalBody = styled.div`
  height: 19rem;
  padding: 1rem;
`;

const StyledTimestampParagraph = styled.p`
  color: #7d8088;
  margin-top: auto;
  margin-bottom: 0.5rem;
`;

const StyledSubmitYourProjectH1 = styled.h1`
font-size: 1.4rem;
`;

const StyledConfirmationH1 = styled.h1`
  margin-top: 20%;
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
  StyledSubmitYourProjectH1,
  StyledConfirmationH1,
  StyledConfirmationParagraph,
};
