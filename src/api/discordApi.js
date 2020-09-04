import { get, post } from "./baseApi";

const getSignupDiscordUrl = async () => {
  const res = await get("/discord/signup");
  return res.data.discordUrl;
};

const getLoginDiscordUrl = async () => {
  const res = await get("/discord/login");
  return res.data.discordUrl;
};

const discordSignup = async (code, state) => {
  const res = await post("/discord/signup", { code, state });
  return res;
};

const discordLogin = async (code, state) => {
  const res = await post("/discord/login", { code, state });
  return res;
};

export { getSignupDiscordUrl, getLoginDiscordUrl, discordSignup, discordLogin };
