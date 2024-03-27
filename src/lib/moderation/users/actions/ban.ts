import env from "../../../../lib/env.js";
import client from "../../../client.js";
import userModerationLog from "../userModerationLog.js";
import type { User } from "discord.js";

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
