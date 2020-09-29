import styled from "styled-components";

const StyledTeacherMenu = styled.div`
  background: #18191b;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.5rem 1rem;
  width: 30%;
  position: absolute;
  right: 0;
  top: 2.8rem;
  z-index: 1000;
  :hover {
    cursor: pointer;
  }

  @media (max-width: 1600px) {
    width: 40%;
  }

  @media (max-width: 1200px) {
    width: 47%;
  }

  @media (max-width: 1045px) {
    width: 20%;
  }

  @media (max-width: 620px) {
    width: 35%;
  }

  @media (max-width: 375px) {
    width: 50%;
  }
`;

const StyledStudentMenu = styled.div`
  background: #18191b;
  font-size: 1rem;
  font-weight: 300;
  padding: 1rem;
  width: 35%;
  position: absolute;
  right: 0;
  top: 2.8rem;
  z-index: 1000;
  :hover {
    cursor: pointer;
  }

  @media (max-width: 1045px) {
    width: 20%;
  }

  @media (max-width: 600px) {
    width: 30%;
  }

  @media (max-width: 375px) {
    width: 45%;
  }
`;

const StyledParagraph = styled.p`
  padding: 0.8rem 0;
`;

export { StyledStudentMenu, StyledTeacherMenu, StyledParagraph };
