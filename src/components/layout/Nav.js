import React, { useState } from "react";
import UserMenu from "../menus/UserMenu";
import { Link } from "react-router-dom";
import {
  StyledNav,
  StyledNavHeader,
  StyledKnightIcon,
  StyledUserIcon,
} from "./StyledLayout";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledNav>
      {menuOpen && <UserMenu handleClose={setMenuOpen} />}
      <Link to="/challenge">
        <StyledKnightIcon className="fas fa-chess-knight fa-lg"></StyledKnightIcon>
      </Link>

      <StyledNavHeader to="/challenge">CHALLENGE BOARD</StyledNavHeader>

      <StyledUserIcon
        className="fas fa-user-circle fa-2x"
        onClick={() => setMenuOpen(!menuOpen)}
      ></StyledUserIcon>
    </StyledNav>
  );
};

export default Nav;
