import { User, inlineCode } from "discord.js";
import timeout from "./actions/users/timeout.js";
import ban from "./actions/users/ban.js";
import { Emoji } from "../util/emoji.js";
import getDuration from "../util/getDuration.js";

export enum InfractionType {
	BadFaith,
	Nsfw,
	PersonalAttacks,
	BigotrySlurs,
	Lnt,
	TrollingShitposting,
	PoliticalControversial,
	SpammerScammer,
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
	}.`;

	const infractionString = `${Emoji.True} Logged infraction ${inlineCode(
		infractionHandlers[type].string
	)} against ${user}${comment ? " with comment " + inlineCode(comment) : ""}.`;

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

export const infractionHandlers = {
	[InfractionType.BadFaith]: {
		string: "Bad-Faith User",
		execute: async ({ user, author, reason }) => {
			return await ban({
				targetUser: user,
				reason,
				author,
				execute: true,
				deleteMessages: false,
			});
		},
	},
	[InfractionType.Nsfw]: {
		string: "NSFW Content",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				targetUser: user,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	[InfractionType.PersonalAttacks]: {
		string: "Personal Attacks",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				targetUser: user,
				reason,
				author,
				duration: getDuration.days(3),
			});
		},
	},
	[InfractionType.BigotrySlurs]: {
		string: "Bigotry/Slurs",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				targetUser: user,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	[InfractionType.Lnt]: {
		string: "Anti-LNT Practices",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				targetUser: user,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	[InfractionType.TrollingShitposting]: {
		string: "Trolling/Shitposting",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				targetUser: user,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	[InfractionType.PoliticalControversial]: {
		string: "Political/Controversial Topics",
		execute: async ({ user, author, reason }) => {
			return await timeout({
				targetUser: user,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	[InfractionType.SpammerScammer]: {
		string: "Spammer/Scammer",
		execute: async ({ user, author, reason }) => {
			return await ban({
				targetUser: user,
				reason,
				author,
				execute: true,
				deleteMessages: true,
			});
		},
	},
} satisfies {
	[K in InfractionType]: {
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
	};
};
