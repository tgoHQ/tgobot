import { User } from "discord.js";
import userModerationLog from "../../lib/moderation/userModerationLog.js";
import { Emoji } from "../../lib/util/emoji.js";

export default async function warn({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `${Emoji.Warn} Warned ${user}`;
	await userModerationLog({ user, author, string, reason });

	//todo take action

	return string;
}
