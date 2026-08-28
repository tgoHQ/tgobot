import type { User } from "discord.js";
import { GUILD } from "#lib/loadDiscordObjects";
import { Emoji } from "#util/emoji";
import { handleUserModAction } from "#lib/moderation/actions/users/index";

/** mod action to kick a user */
export async function kick({
	targetUser,
	reason,
	author,
	loggingOnly,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	loggingOnly?: boolean;
}) {
	const string = `${Emoji.Kick} Kicked ${targetUser}`;

	await handleUserModAction({ targetUser, string, reason, author });

	if (!loggingOnly) {
		const guild = await GUILD();
		await guild.members.kick(targetUser);
	}

	return string;
}
