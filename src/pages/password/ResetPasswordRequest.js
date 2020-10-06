import React, { useState, Fragment } from "react";
import { triggerPasswordReset } from "../../api/passwordApi";
import {
  StyledPurpleButton,
  StyledFormContent,
  StyledFormHeader,
  StyledFormBody,
  StyledFormInputArea,
} from "../../styles/GlobalStyledComponents";
import { StyledH2 } from "./StyledResetPassword";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await triggerPasswordReset(email);
    setIsSubmitted(true);
  };

  return (
    <StyledFormContent>
      {!isSubmitted ? (
        <Fragment>
          <StyledFormHeader>
            <h1>Reset Password</h1>
          </StyledFormHeader>
          <StyledFormBody>
            <form onSubmit={handleSubmit} id="login-form">
              <StyledFormInputArea>
                <label htmlFor="reset-password-email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="reset-password-email"
                  name="reset-password-email"
                  required
                ></input>
              </StyledFormInputArea>

              <StyledPurpleButton type="submit">Submit</StyledPurpleButton>
            </form>
          </StyledFormBody>
        </Fragment>
      ) : (
        <Fragment>
          <StyledFormHeader>
            <StyledH2>
              Check your email for a link to reset your password.
            </StyledH2>
          </StyledFormHeader>
        </Fragment>
      )}
    </StyledFormContent>
  );
};

export default ResetPassword;
