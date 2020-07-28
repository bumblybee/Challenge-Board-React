import React from "react";

const Nav = () => {
  return (
    <div className="nav">
      <i className="fas fa-chess-knight fa-lg"></i>
      <h3>CHALLENGE BOARD</h3>
      <i id="user-menu-toggle" className="fas fa-user-circle fa-2x"></i>

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
    </div>
  );
};

export default Nav;
