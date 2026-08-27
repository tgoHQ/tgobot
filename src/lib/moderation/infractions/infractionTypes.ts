import { timeout } from "../actions/users/timeout.js";
import { ban } from "../actions/users/ban.js";
import { warn } from "../actions/users/warn.js";
import { getDuration } from "../../../util/getDuration.js";
import type { User } from "discord.js";

export const InfractionTypes: InfractionType[] = [
	{
		group: "NSFW Content",
		title: "4d",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	{
		group: "NSFW Content",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
	{
		group: "Personal Attacks",
		title: "3d",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(3),
			});
		},
	},
	{
		group: "Personal Attacks",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
	{
		group: "Bigotry",
		title: "12h",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	{
		group: "Bigotry",
		title: "4d",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.days(4),
			});
		},
	},
	{
		group: "Bigotry",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
	{
		group: "Anti-LNT Practices",
		title: "12h",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	{
		group: "Anti-LNT Practices",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
	{
		group: "Trolling/Shitposting",
		title: "12h",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	{
		group: "Trolling/Shitposting",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
	{
		group: "Political/Controversial Topics",
		title: "12h",
		execute: async ({ targetUser, author, reason }) => {
			return await timeout({
				targetUser,
				reason,
				author,
				duration: getDuration.hours(12),
			});
		},
	},
	{
		group: "Political/Controversial Topics",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: false,
			});
		},
	},
	{
		group: "Soliciting",
		title: "Warning",
		execute: async ({ targetUser, author, reason }) => {
			return await warn({
				targetUser,
				author,
				reason,
			});
		},
	},
	{
		group: "Soliciting",
		title: "Bad-Faith",
		execute: async ({ targetUser, author, reason }) => {
			return await ban({
				targetUser,
				reason,
				author,
				deleteMessages: true,
			});
		},
	},
];

/** an infraction type is a module that defines and can execute a particular infraction on a user */
export type InfractionType = {
	/** the human friendly name of the group/category this infraction type belongs to */
	group: string;
	/** the human-friendly title of this infraction type */
	title: string;
	/** the function that executes the consequence of this infraction, such as giving the proper warnig, timeout, or ban */
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
