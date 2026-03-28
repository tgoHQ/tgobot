import { timeout } from "../actions/users/timeout.js";
import { ban } from "../actions/users/ban.js";
import { warn } from "../actions/users/warn.js";
import { getDuration } from "../../../util/getDuration.js";
import type { User } from "discord.js";

export const InfractionTypes = {
	nsfw: {
		humanName: "NSFW Content",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	personalAttacks: {
		humanName: "Personal Attacks",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(3),
			});
		},
	},
	bigotrySlurs: {
		humanName: "Bigotry/Slurs",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	lnt: {
		humanName: "Anti-LNT Practices",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	trollingShitposting: {
		humanName: "Trolling/Shitposting",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	politicalControversial: {
		humanName: "Political/Controversial Topics",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	selfPromoWarning: {
		humanName: "Self-Promotion, Warning",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await warn({
				targetUser,
				author,
				reason,
			});
		},
	},
	selfPromoBadFaith: {
		humanName: "Self-Promotion, Bad-Faith",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: true,
			});
		},
	},
	badFaith: {
		humanName: "Bad-Faith User",
		executeConsequence: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
} as const satisfies {
	[K in string]: InfractionType;
};

/** an infraction type is a module that defines and can execute a particular infraction on a user */
export type InfractionType = {
	/** the title of this infraction type */
	humanName: string;
	/** the function that executes the consequence of this infraction, such as giving the proper warnig, timeout, or ban */
	executeConsequence: ({
		targetUser,
		author,
		reason,
	}: {
		targetUser: User;
		author: User;
		reason: string;
	}) => Promise<string>;
};
