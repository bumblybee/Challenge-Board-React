import styled from "styled-components";

const StyledErrorMsg = styled.div`
  color: #f77;
  text-align: center;
  font-size: 1.1rem;
  background: #000;
  padding: 1rem;
  margin: 0 auto;
  width: 70%;
  border-radius: 6px;
`;

const StyledSpan = styled.span`
  color: #809bff;
  :hover {
    cursor: pointer;
  }
`;

const StyledTeacherMenu = styled.div`
  background: #18191b;
  padding: 1rem;
  width: 40%;
  position: absolute;
  right: 0;
  top: 1.8rem;
  z-index: 100;
  :hover {
    cursor: pointer;
  }
`;

export { StyledErrorMsg, StyledSpan, StyledTeacherMenu };
