import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Link } from "react-router-dom";

const UserMenu = ({ handleClose }) => {
  // TODO: links to settings and account pages
  //TODO: "log in" change to "log out" if checkLoggedIn true

  const logout = async () => {
    setUser(null);
    handleClose(false);
  };

  const { user, setUser } = useContext(UserContext);
  return (
    <div className="user-menu-container">
      <ul className="user-menu">
        <li className="my-account">
          <Link to="/account" onClick={() => handleClose(false)}>
            My Account
          </Link>
        </li>
        <li className="settings">
          <Link to="/settings">Settings</Link>
        </li>
        <hr />
        <li className="signup-link">
          {/* Handle close closes user menu */}
          {!user ? (
            <Link to="/signup" onClick={() => handleClose(false)}>
              Sign Up
            </Link>
          ) : (
            ""
          )}
        </li>
        <li className="login">
          {!user ? (
            <Link to="/login" onClick={() => handleClose(false)}>
              Login
            </Link>
          ) : (
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
