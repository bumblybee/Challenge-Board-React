import styled from "styled-components";

const StyledTeacherMenu = styled.div`
  background: #18191b;
  ont-size: 1.05rem;
  padding: 1rem;
  width: 30%;
  position: absolute;
  right: 0;
  top: 2.8rem;
  z-index: 1000;
  :hover {
    cursor: pointer;
  }
`;

const StyledStudentMenu = styled.div`
  background: #18191b;
  font-size: 1.05rem;
  padding: 1rem;
  width: 35%;
  position: absolute;
  right: 0;
  top: 2.8rem;
  z-index: 1000;
  :hover {
    cursor: pointer;
  }
`;

const StyledParagraph = styled.p`
  padding: 0.8rem 0;
`;

export { StyledStudentMenu, StyledTeacherMenu, StyledParagraph };
