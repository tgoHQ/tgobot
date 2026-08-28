import type { User } from "discord.js";
import { GUILD } from "#lib/loadDiscordObjects";
import { Emoji } from "#util/emoji";
import { getDuration } from "#util/getDuration";
import { handleUserModAction } from "#lib/moderation/actions/users/index";

/** mod action to ban a user */
export async function ban({
	targetUser,
	reason,
	author,
	loggingOnly,
	deleteMessages,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	loggingOnly?: boolean;
	deleteMessages: boolean;
}) {
	const string = `${Emoji.Ban} Banned ${targetUser}`;

	await handleUserModAction({ targetUser, string, reason, author });

	if (!loggingOnly) {
		const guild = await GUILD();
		await guild.bans.create(targetUser, {
			reason,
			deleteMessageSeconds: deleteMessages ? getDuration.days(7) / 1000 : 0,
		});
	}

	return string;
}
