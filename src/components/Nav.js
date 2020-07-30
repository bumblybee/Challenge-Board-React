import React, { useState, Fragment } from "react";
import UserMenu from "./UserMenu";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav">
      {isOpen && <UserMenu />}
      <i className="fas fa-chess-knight fa-lg"></i>
      <h3>CHALLENGE BOARD</h3>
      <i
        id="user-menu-toggle"
        className="fas fa-user-circle fa-2x"
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </div>
  );
};

export default Nav;
