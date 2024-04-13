import { User } from "discord.js";
import userModerationLog from "../../lib/moderation/userModerationLog.js";
import client from "../../lib/discord/client.js";
import env from "../../lib/util/env.js";
import { Emoji } from "../../lib/util/emoji.js";

export default async function kick({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `${Emoji.Kick} Kicked ${user}`;
	await userModerationLog({ user, author, string, reason });

	const guild = await client.guilds.fetch(env.GUILD_ID);
	guild.members.kick(user);

	return string;
}
