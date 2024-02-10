import env from "./env.js";
import client from "./client.js";

export const guild = (await client.guilds.fetch(env.GUILD_ID)).fetch;
