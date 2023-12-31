import env from "./env.js";
import client from "./client.js";

console.log((await client.guilds.fetch(env.GUILD_ID)).name);

export default {};
