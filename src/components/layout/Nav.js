import React, { useState } from "react";
import UserMenu from "../menus/UserMenu";
import { Link } from "react-router-dom";
import { StyledNav, StyledNavHeader } from "./StyledLayout";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledNav>
      {menuOpen && <UserMenu handleClose={setMenuOpen} />}
      <Link to="/challenge">
        <i className="fas fa-chess-knight fa-lg"></i>
      </Link>

      <StyledNavHeader to="/challenge">CHALLENGE BOARD</StyledNavHeader>

      <i
        id="user-menu-toggle"
        className="fas fa-user-circle fa-2x"
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>
    </StyledNav>
  );
};

export default Nav;
