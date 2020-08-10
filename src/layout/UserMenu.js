import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ handleClose }) => {
  // TODO: links to settings and account pages
  return (
    <div className="user-menu-container">
      <ul className="user-menu">
        <li className="my-account">
          <Link to="/account">My Account</Link>
        </li>
        <li className="settings">
          <Link to="/settings">Settings</Link>
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
