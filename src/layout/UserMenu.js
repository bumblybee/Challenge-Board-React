import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ handleClose }) => {
  return (
    <div className="user-menu-container">
      <ul className="user-menu">
        <li className="my-account">
          <a href="#">My Account</a>
        </li>
        <li className="settings">
          <a href="#">Settings</a>
        </li>
        <hr />
        <li className="signup-link">
          {/* Handle close closes user menu */}
          <Link to="/signup" onClick={() => handleClose(false)}>
            Sign Up
          </Link>
        </li>
        <li className="login">
          <Link to="/login" onClick={() => handleClose(false)}>
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
