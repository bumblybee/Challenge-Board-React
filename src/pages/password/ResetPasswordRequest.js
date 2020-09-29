import React, { useState, Fragment } from "react";
import { triggerPasswordReset } from "../../api/passwordApi";
import { StyledPurpleButton } from "../../styles/GlobalStyledComponents";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await triggerPasswordReset(email);
    setIsSubmitted(true);
  };

  return (
    <div className="login-form-content">
      {!isSubmitted ? (
        <Fragment>
          <div className="login-form-header">
            <h1>Reset Password</h1>
          </div>
          <div className="login-form-body">
            <form onSubmit={handleSubmit} id="login-form">
              <div className="input-area">
                <label htmlFor="reset-password-email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="reset-password-email"
                  name="reset-password-email"
                  required
                ></input>
              </div>

              <StyledPurpleButton type="submit">Submit</StyledPurpleButton>
            </form>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="login-form-header">
            <h2 style={{ padding: "2rem" }}>
              Check your email for a link to reset your password.
            </h2>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ResetPassword;
