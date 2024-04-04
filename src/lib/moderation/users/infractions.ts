import { User } from "discord.js";
import timeout from "./actions/timeout.js";
import ban from "./actions/ban.js";
import { Emoji } from "../../emoji.js";

export enum InfractionType {
	badFaith = 0,
	nsfw = 1,
	personalAttacks = 2,
	slursBigotry = 3,
	lnt = 4,
	shitpost = 5,
	controversial = 6,
}

export async function infraction({
	type,
	user,
	author,
	comment,
}: {
	type: InfractionType;
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
	const reason = `${infractionHandlers[type].string}${
		comment ? ". Comment: " + comment : ""
	}`;

	const infractionString = `Logged infraction \`${infractionHandlers[type].string}\` against ${user} with comment \`${comment}\`.`;

	//execute the chosen infraction type module
	const actionResultsString = await infractionHandlers[type].execute({
		user,
		author,
		reason,
	});

	return {
		infractionString,
		actionResultsString,
	};
}

export const infractionHandlers: {
	[K in InfractionType]: InfractionHandler;
} = {
	[InfractionType.badFaith]: {
		string: "Bad-Faith User",
		execute: async ({ user, author, reason }) => {
			return await ban({ user, reason, author, execute: true });
		},
	},
	[InfractionType.nsfw]: {
		string: "NSFW Content",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 4 * 24 * 60 * 60 * 1000,
			});
		},
	},
	[InfractionType.personalAttacks]: {
		string: "Personal Attacks",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 3 * 24 * 60 * 60 * 1000,
			});
		},
	},
	[InfractionType.slursBigotry]: {
		string: "Slurs and/or Bigotry",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 4 * 24 * 60 * 60 * 1000,
			});
		},
	},
	[InfractionType.lnt]: {
		string: "Anti-LNT Practices",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 12 * 60 * 60 * 1000,
			});
		},
	},
	[InfractionType.shitpost]: {
		string: "Shitposting, Trolling, and/or Spamming",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 12 * 60 * 60 * 1000,
			});
		},
	},
	[InfractionType.controversial]: {
		string: "Politics and/or Controversial Topics",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 12 * 60 * 60 * 1000,
			});
		},
	},
};

interface InfractionHandler {
	/** The human-readable name of the infraction type */
	string: string;
	execute({
		user,
		author,
		reason,
	}: {
		user: User;
		author: User;
		reason: string;
	}): Promise<string>;
}
