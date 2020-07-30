import React from "react";

const UserMenu = (props) => {
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
        <li className="register">
          <a href="#">Register</a>
        </li>
        <li className="login">
          <a href="#">Login</a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
