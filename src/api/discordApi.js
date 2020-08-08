import instance from "./baseApi";

const getDiscordUrl = async () => {
  const res = await instance.get("/discord");
  return res.data.discordUrl;
};

const discordSignup = async (code, state) => {
  const res = await instance.post("/discord/signup", { code, state });
  return res.data;
};

export { getDiscordUrl, discordSignup };
