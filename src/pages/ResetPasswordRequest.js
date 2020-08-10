import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { triggerPasswordReset } from "../api/passwordApi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await triggerPasswordReset(email);
    setIsSubmitted(true);

    //TODO: remove after wiring up new password route
    setTimeout(() => {
      history.push("/challenge");
    }, 4000);
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

              <button type="submit">Submit</button>
            </form>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="login-form-header">
            <h3>Check your email</h3>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ResetPassword;
