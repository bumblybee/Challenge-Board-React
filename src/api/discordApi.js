import instance from "./baseApi";

const getDiscordUrl = async () => {
  const res = await instance.get("/discord");
  return res.data.discordUrl;
};

const discordSignup = async (code, state) => {
  const res = await instance.post("/discord/signup", { state, code });
  return res;
};

export { getDiscordUrl, discordSignup };
