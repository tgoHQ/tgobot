import { User, inlineCode } from "discord.js";
import { Emoji } from "../../../util/emoji.js";
import type { InfractionHandler } from "./handlers.js";

export async function createInfraction({
	type: type,
	user,
	author,
	comment,
}: {
	type: InfractionHandler;
	user: User;
	author: User;
	comment: string | null;
}) {
	if (user === author) {
		return {
			infractionString: `${Emoji.False} You can't give yourself an infraction!`,
			actionResultsString: "",
		};
	}

	//combine infraction string and mod comment to create reason
	const reason = `${type.humanName}${comment ? ". Comment: " + comment : ""}.`;

	const infractionString = `${Emoji.True} Logged infraction ${inlineCode(
		type.humanName,
	)} against ${user}${comment ? " with comment " + inlineCode(comment) : ""}.`;

	//execute the chosen infraction type module
	const actionResultsString = await type.execute({
		targetUser: user,
		author,
		reason,
	});

	return {
		infractionString,
		actionResultsString,
	};
}
