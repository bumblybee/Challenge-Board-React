import styled from "styled-components";

const StyledError = styled.div`
  color: #ff8080;
  text-align: center;
  font-size: 1.5rem;
  padding-top: 0.5rem;
  border-radius: 6px;
  width: 60%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 620px) {
    width: 100%;
    font-size: 1.3rem;
  }
`;

export { StyledError };
