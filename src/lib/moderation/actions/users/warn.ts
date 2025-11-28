import { modUserLogEmbed } from "../../modLog.js";

import type { User } from "discord.js";
import { Emoji } from "../../../../util/emoji.js";

type WarnUserOpts = {
	/** the user who is receiving the warning */
	targetUser: User;
	/** the reason/content of the warning */
	reason: string;
	/** the user who created the warning */
	author: User;
};

export default async function warn(opts: WarnUserOpts) {
	const string = `${Emoji.Warn} Warned ${opts.targetUser}`;

	await modUserLogEmbed(opts.targetUser, string, opts.author, opts.reason);

	return string;
}
