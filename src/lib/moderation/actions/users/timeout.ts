import { User } from "discord.js";
import env from "../../../util/env.js";
import { container } from "@sapphire/framework";
import { Emoji } from "../../../util/emoji.js";

import { modUserLogEmbed } from "../../modLog.js";
import humanizeDuration from "humanize-duration";

export default async function timeout({
	targetUser,
	reason,
	author,
	duration,
}: {
	targetUser: User;
	reason: string;
	author: User;
	duration: number; //duration in ms
}) {
	//todo dm the user

	const string = `${
		Emoji.Timeout
	} Timed out ${targetUser} for ${humanizeDuration(duration)}`;

	await modUserLogEmbed(targetUser, string, author, reason);

	const guild = await container.client.guilds.fetch(env.GUILD_ID);
	const member = await guild.members.fetch(targetUser);
	await member.timeout(duration, reason);

	return string;
}
