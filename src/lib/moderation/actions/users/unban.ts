import type { User } from "discord.js";
import { GUILD } from "#lib/loadDiscordObjects";
import { Emoji } from "#util/emoji";
import { handleUserModAction } from "#lib/moderation/actions/users/index";

/** mod action to unban a user */
export async function unban({
	targetUser,
	reason,
	author,
}: {
	targetUser: User;
	reason?: string;
	author: User;
}) {
	const string = `${Emoji.True} Unbanned ${targetUser}`;

	// unban before logging so a failed unban (e.g. user isn't banned) isn't logged
	const guild = await GUILD();
	await guild.bans.remove(targetUser, reason);

	await handleUserModAction({ targetUser, string, reason, author });

	return string;
}
