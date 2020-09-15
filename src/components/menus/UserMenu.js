import React, { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

import { Link } from "react-router-dom";

const UserMenu = ({ handleClose }) => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    handleClose(false);
  };

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
            <p onClick={logout}>Logout</p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
