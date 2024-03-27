import { User } from "discord.js";
import userModerationLog from "../userModerationLog.js";
import client from "../../../client.js";
import env from "../../../env.js";

export default async function kick({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `<:kick:1073030912230572143> Kicked ${user}`;
	await userModerationLog({ user, author, string, reason });

	const guild = await client.guilds.fetch(env.GUILD_ID);
	guild.members.kick(user);

	return string;
}
