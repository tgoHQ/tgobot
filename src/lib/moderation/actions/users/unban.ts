import { type User, DiscordAPIError, RESTJSONErrorCodes } from "discord.js";
import { GUILD } from "#lib/loadDiscordObjects";
import { Emoji } from "#util/emoji";
import { handleUserModAction } from "#lib/moderation/actions/users/index";

/** mod action to unban a user */
export async function unban({
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
	const string = `${Emoji.True} Unbanned ${targetUser}`;

	// unban before logging so a failed unban isn't logged
	if (!loggingOnly) {
		const guild = await GUILD();
		try {
			await guild.bans.remove(targetUser, reason);
		} catch (error) {
			if (
				error instanceof DiscordAPIError &&
				error.code === RESTJSONErrorCodes.UnknownBan
			) {
				return `${Emoji.False} ${targetUser} isn't banned.`;
			}
			throw error;
		}
	}

	await handleUserModAction({ targetUser, string, reason, author });

	return string;
}
