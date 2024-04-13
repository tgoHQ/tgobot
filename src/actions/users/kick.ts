import { User } from "discord.js";
import userModLogEmbed from "../../lib/moderation/modlogUserEmbed.js";
import client from "../../lib/discord/client.js";
import env from "../../lib/util/env.js";
import { Emoji } from "../../lib/util/emoji.js";

export default async function kick({
	targetUser,
	reason,
	author,
}: {
	targetUser: User;
	reason: string;
	author: User;
}) {
	//todo dm the user
	const string = `${Emoji.Kick} Kicked ${targetUser}`;
	await userModLogEmbed({ targetUser: targetUser, author, string, reason });

	const guild = await client.guilds.fetch(env.GUILD_ID);
	guild.members.kick(targetUser);

	return string;
}
