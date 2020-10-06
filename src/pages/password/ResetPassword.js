import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { passwordReset } from "../../api/passwordApi";
import { ErrorContext } from "../../context/error/ErrorContext";

import {
  StyledPurpleButton,
  StyledFormContent,
  StyledFormHeader,
  StyledFormBody,
  StyledFormInputArea,
} from "../../styles/GlobalStyledComponents";

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const { setError } = useContext(ErrorContext);
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
    <StyledFormContent>
      <StyledFormHeader>
        <h1>Enter New Password</h1>
      </StyledFormHeader>
      <StyledFormBody>
        <form id="login-form" onSubmit={handleSubmit}>
          <StyledFormInputArea>
            <label htmlFor="new-password">New Password</label>
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              id="new-password"
              name="new-password"
              minLength="8"
              required
            ></input>
          </StyledFormInputArea>

          <StyledPurpleButton type="submit">Submit</StyledPurpleButton>
        </form>
      </StyledFormBody>
    </StyledFormContent>
  );
};

export default ResetPassword;
