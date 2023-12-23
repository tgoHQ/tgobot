import env from "./env";
import client from "./client";

console.log((await client.guilds.fetch(env.GUILD_ID)).name);

export default {};
