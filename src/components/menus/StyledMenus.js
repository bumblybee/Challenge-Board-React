import styled from "styled-components";

export const StyledTeacherMenu = styled.div`
  background: #18191b;
  font-size: 1rem;
  font-weight: 300;
  padding: ${(props) => (props.isComment ? "0 1rem" : "0.3rem 1rem")};
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

export const StyledUserMenuContainer = styled.div`
  background: #18191b;
  position: absolute;
  top: 3rem;
  right: 0;
  padding: 1rem;
  width: 12rem;
  z-index: 100;

  p {
    :hover {
      cursor: pointer;
    }
  }
`;

export const StyledUserMenu = styled.ul`
  li:not(:first-child) {
    margin-top: 1rem;
  }

  .user-menu li:first-child {
    margin-bottom: 2rem;
  }

  hr {
    margin-top: 1rem;
  }

  a {
    text-decoration: none;
    color: var(--primary-text);
  }
`;

export const StyledStudentMenu = styled.div`
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

export const StyledParagraph = styled.p`
  padding: 0.7rem 0;
`;
