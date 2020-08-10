import instance from "./baseApi";

const triggerPasswordReset = async (email) => {
  return await instance.post(`/users/password-reset`, {
    email,
  });
};

const passwordReset = async (token, newPassword) => {
  return await instance.post(`/users/password-reset/${token}`, {
    password: newPassword,
  });
};

export { triggerPasswordReset, passwordReset };
