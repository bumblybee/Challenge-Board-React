import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";

import { Link } from "react-router-dom";
import * as sc from "./StyledMenus";

const UserMenu = ({ handleClose }) => {
  const { user, handleLogout } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    handleLogout();
    handleClose(false);
    history.replace("/challenge");
  };

  return (
    <sc.StyledUserMenuContainer>
      <sc.StyledUserMenu>
        {user && (
          <li className="my-account">
            <Link to="/account" onClick={() => handleClose(false)}>
              My Account
            </Link>
          </li>
        )}
        {user && (
          <li className="settings">
            <Link to="/settings">Settings</Link>
          </li>
        )}

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
              Log In
            </Link>
          ) : (
            <p onClick={logout}>Log Out</p>
          )}
        </li>
      </sc.StyledUserMenu>
    </sc.StyledUserMenuContainer>
  );
};

export default UserMenu;
