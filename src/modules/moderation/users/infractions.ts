import { User } from "discord.js";
import timeout from "./actions/timeout.js";
import ban from "./actions/ban.js";

export async function infraction({
	type,
	user,
	author,
	comment,
}: {
	type;
	user: User;
	author: User;
	comment: string | undefined;
}) {
	//combine infraction string and mod comment to create reason
	const reason = `${infractionTypes[type].string}${
		comment ? ". Comment: " + comment : ""
	}`;

	const infractionString = `Logged infraction \`${infractionTypes[type].string}\` against ${user} with comment \`${comment}\`.`;

	//execute the chosen infraction type module
	const actionResultsString = await infractionTypes[type].execute({
		user,
		author,
		reason,
	});

	return {
		infractionString,
		actionResultsString,
	};
}

export const infractionTypes: { [key: string]: InfractionType } = {
	badFaith: {
		string: "Bad-Faith User",
		execute: async ({ user, author, reason }) => {
			return await ban({ user, reason, author });
		},
	},
	nsfw: {
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
	personalAttacks: {
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
	slursBigotry: {
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
	lnt: {
		string: "Anti-LNT Practices",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 6 * 60 * 60 * 1000,
			});
		},
	},
	shitpost: {
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
	controversial: {
		string: "Politics and/or Controversial Topics",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				user,
				reason,
				author,
				duration: 6 * 60 * 60 * 1000,
			});
		},
	},
};

interface InfractionType {
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
