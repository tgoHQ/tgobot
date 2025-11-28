import timeout from "../actions/users/timeout.js";
import ban from "../actions/users/ban.js";
import warn from "../actions/users/warn.js";
import getDuration from "../../../util/getDuration.js";
import type { User } from "discord.js";

export const InfractionTypes = {
	BadFaith: {
		humanName: "Bad-Faith User",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				execute: true,
				deleteMessages: false,
			});
		},
	},
	Nsfw: {
		humanName: "NSFW Content",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	PersonalAttacks: {
		humanName: "Personal Attacks",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(3),
			});
		},
	},
	BigotrySlurs: {
		humanName: "Bigotry/Slurs",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	Lnt: {
		humanName: "Anti-LNT Practices",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	TrollingShitposting: {
		humanName: "Trolling/Shitposting",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	PoliticalControversial: {
		humanName: "Political/Controversial Topics",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	SpammerScammer: {
		humanName: "Spammer/Scammer",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				execute: true,
				deleteMessages: true,
			});
		},
	},
	SelfPromoWarning: {
		humanName: "Self-Promotion Warning",
		execute: async ({ targetUser, author, reason }) => {
			return await warn({
				targetUser,
				author,
				reason,
			});
		},
	},
} as const satisfies {
	[K in string]: InfractionHandler;
};

export type InfractionHandler = {
	humanName: string;
	execute: ({
		targetUser,
		author,
		reason,
	}: {
		targetUser: User;
		author: User;
		reason: string;
	}) => Promise<string>;
};
