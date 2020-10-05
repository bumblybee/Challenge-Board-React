import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNav = styled.div`
  background: var(--secondary-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const StyledNavHeader = styled(Link)`
  color: var(--title-text);
  font-family: "Roboto Slab", serif;
  font-weight: 500;
  font-size: 1.05rem;
  letter-spacing: 0.15rem;
`;

export const StyledModal = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const StyledModalContent = styled.div`
  background: #2f3136;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 30%;
  padding: 2rem;
  box-shadow: 0 2px 4.1px -43px rgba(0, 0, 0, 0.101),
    0 4.7px 13.8px -43px rgba(0, 0, 0, 0.129),
    0 20px 62px -43px rgba(0, 0, 0, 0.18);

  border-radius: 6px;

  @media (max-width: 1540px) {
    width: 45%;
  }

  @media (max-width: 1045px) {
    width: 60%;
  }

  @media (max-width: 900) {
    width: 65%;
  }

  @media (max-width: 620px) {
    width: 90%;
    padding: 1rem;
    top: 40%;
    left: 35%;
    transform: translate(-34%, -35%);
  }

  @media (orientation: landscape) and (min-device-width: 319px) and (max-device-width: 900px) {
    width: 70%;
  } ;
`;
