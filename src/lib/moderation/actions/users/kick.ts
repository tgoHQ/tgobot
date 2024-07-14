import { User } from "discord.js";
import { modUserLogEmbed } from "../../modLog.js";
import { container } from "@sapphire/framework";
import env from "../../../util/env.js";
import { Emoji } from "../../../util/emoji.js";

export default async function kick({
	targetUser,
	reason,
	author,
	execute,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	execute: boolean;
}) {
	//todo dm the user
	const string = `${Emoji.Kick} Kicked ${targetUser}`;
	await modUserLogEmbed(targetUser, string, author, reason);

	const guild = await container.client.guilds.fetch(env.GUILD_ID);

	if (execute) await guild.members.kick(targetUser);

	return string;
}
