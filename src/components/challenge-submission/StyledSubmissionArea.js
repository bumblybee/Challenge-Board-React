import styled from "styled-components";

export const StyledSubmissionContainer = styled.div`
  background: #2f3136;
  padding: 2.9rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.05),
    0 6.7px 5.3px rgba(0, 0, 0, 0.06), 0 12.5px 10px rgba(0, 0, 0, 0.07);
  margin-right: 1rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;

  @media (max-width: 1045px) {
    margin-right: 0;
    width: 100%;
    margin-bottom: 1rem;
  }

  @media (max-width: 620px) {
    margin: 0 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0;
  }
`;

export const StyledModalBody = styled.div`
  height: 10rem;
  width: 100%;
  @media (max-width: 620px) {
    height: 5rem;
    padding: 0 0.5rem;
  }
`;

export const StyledSubmissionContent = styled.div`
  @media (max-width: 620px) {
    margin: 0 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0;
  }
`;

export const StyledH1 = styled.h1`
  margin-bottom: 0.2rem;
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

export const StyledEditSubmission = styled.div`
  display: flex;
`;
