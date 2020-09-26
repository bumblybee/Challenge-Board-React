import React, { useState } from "react";
import UserMenu from "../menus/UserMenu";
import { Link } from "react-router-dom";
import { StyledNavHeader } from "./StyledLayout";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (open) => {
    setIsOpen(open);
  };

  return (
    <div className="nav">
      {isOpen && <UserMenu handleClose={handleClose} />}
      <Link to="/challenge">
        <i className="fas fa-chess-knight fa-lg"></i>
      </Link>

      <StyledNavHeader to="/challenge">
        CHALLENGE BOARD
        </StyledNavHeader>

      <i
        id="user-menu-toggle"
        className="fas fa-user-circle fa-2x"
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </div>
  );
};

export default Nav;
