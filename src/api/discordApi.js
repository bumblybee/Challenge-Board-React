import { instance, post } from "./baseApi";

const getDiscordUrl = async () => {
  const res = await instance.get("/discord");
  return res.data.discordUrl;
};

const discordLogin = async (code, state) => {
  const res = await post("/discord/login", { code, state });
  return res;
};

// const discordLogin = async (code, state) => {
//   const res = await post("/discord/login", { code, state });
//   return res;
// };

export { getDiscordUrl, discordLogin };
