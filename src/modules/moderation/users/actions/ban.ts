import env from "../../../../util/env.js";
import client from "../../../../util/client.js";
import { User } from "discord.js";
import userModerationLog from "../userModerationLog.js";

export default async function ban({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `<:ban:1049256901562609684> Banned ${user}`;
	await userModerationLog({ user, author, string, reason });

	const guild = await client.guilds.fetch(env.GUILD_ID);
	await guild.bans.create(user, {
		reason: reason,
	});

	return string;
}
