import React, { useState } from "react";
import UserMenu from "../components/menus/UserMenu";
import { Link } from "react-router-dom";

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
      <h3>
        <Link to="/challenge" style={{ color: "#809bff" }}>
          CHALLENGE BOARD
        </Link>
      </h3>
      <i
        id="user-menu-toggle"
        className="fas fa-user-circle fa-2x"
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </div>
  );
};

export default Nav;
