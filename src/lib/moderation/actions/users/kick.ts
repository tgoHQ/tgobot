import type { User } from "discord.js";
import { GUILD } from "../../../loadDiscordObjects.js";
import { Emoji } from "../../../../util/emoji.js";
import { handleUserModAction } from "./index.js";

export default async function kick({
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
