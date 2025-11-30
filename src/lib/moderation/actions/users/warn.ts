import { modlog } from "../modlog.js";

import type { User } from "discord.js";
import { Emoji } from "../../../../util/emoji.js";
import { modActionDmUser } from "./dmUser.js";

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

	await modActionDmUser({ targetUser, string, author, reason });
	await modlog.postUserAction({
		targetUser,
		string,
		author,
		reason,
	});

	return string;
}
