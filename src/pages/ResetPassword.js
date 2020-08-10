import React from "react";

const ResetPassword = () => {
  return (
    <div className="login-form-content">
      <div className="login-form-header">
        <h1>Enter New Password</h1>
      </div>
      <div className="login-form-body">
        <form id="login-form">
          <div className="input-area">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              minLength="5"
              required
            ></input>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
