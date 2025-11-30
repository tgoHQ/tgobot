import type { User } from "discord.js";
import { Emoji } from "../../../../util/emoji.js";
import { handleUserModAction } from ".";

type WarnUserOpts = {
	/** the user who is receiving the warning */
	targetUser: User;
	/** the reason/content of the warning */
	reason: string;
	/** the user who created the warning */
	author: User;
};

export default async function warn({
	targetUser,
	reason,
	author,
}: WarnUserOpts) {
	const string = `${Emoji.Warn} Warned ${targetUser}`;

	await handleUserModAction({ targetUser, string, reason, author });

	return string;
}
