import React, { useState, Fragment } from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (open) => {
    setIsOpen(open);
  };

  return (
    <div className="nav">
      {isOpen && <UserMenu handleClose={handleClose} />}
      <Link to="/">
        <i className="fas fa-chess-knight fa-lg"></i>
      </Link>
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
