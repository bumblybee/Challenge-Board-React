import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { passwordReset } from "../api/passwordApi";
import Error from "../components/errors/Error";
import { StyledPurpleButton } from "../styles/GlobalStyledComponents";

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(undefined);
  const [newPassword, setNewPassword] = useState("");
  const path = location.pathname.split("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = path[2];
    const resetPassword = await passwordReset(token, newPassword);

    if (resetPassword.error || !resetPassword) {
      setError(resetPassword.error);
    } else if (resetPassword.data.id) {
      history.push("/login");
    }
  };

  return (
    <div className="login-form-content">
      <div className="login-form-header">
        {error ? (
          <Error>
            <div>{error}</div>
          </Error>
        ) : (
          <h1>Enter New Password</h1>
        )}{" "}
      </div>
      <div className="login-form-body">
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-area">
            <label htmlFor="new-password">New Password</label>
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              id="new-password"
              name="new-password"
              minLength="5"
              required
            ></input>
          </div>

          <StyledPurpleButton type="submit">Submit</StyledPurpleButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
