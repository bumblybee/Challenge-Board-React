import { post } from "./baseApi";

const triggerPasswordReset = async (email) => {
  return await post(`/users/password-reset`, {
    email,
  });
};

const passwordReset = async (token, newPassword) => {
  return await post(`/users/password-reset/${token}`, {
    password: newPassword,
  });
};

export { triggerPasswordReset, passwordReset };
