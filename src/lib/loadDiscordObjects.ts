//fetch each of the objects (channel, guild, user, roles, etc)
//export them all in a single object

import env from "./env.js";
import client from "./client.js";
import { Channel, ChannelType } from "discord.js";

export const GUILD = await client.guilds.fetch(env.GUILD_ID);

// ROLES //
async function fetchRole(id: string) {
	const role = await GUILD.roles.fetch(id);
	if (!role) throw new Error("Role not found");
	return role;
}
export const ROLE_BOT = await fetchRole(env.ROLE_BOT_ID);
export const ROLE_VCPING = await fetchRole(env.ROLE_VCPING_ID);
export const ROLE_INTRODUCED = await fetchRole(env.ROLE_INTRODUCED_ID);

// CHANNELS //

async function fetchChannel<T extends ChannelType>(
	id: string,
	type: T
): Promise<Channel & { type: T }> {
	const channel = await client.channels.fetch(id);
	if (!channel) throw new Error("Channel not found");
	if (channel.type !== type) throw new Error("Channel is not of type " + type);
	return channel as Channel & { type: T };
}

export const CHANNEL_INTRODUCTIONS = await fetchChannel(
	env.CHANNEL_INTRODUCTIONS_ID,
	ChannelType.GuildText
);
if (CHANNEL_INTRODUCTIONS.type !== ChannelType.GuildText) {
	throw new Error("Channel is not of type " + ChannelType.GuildText);
}
export const CHANNEL_ALERT = await fetchChannel(
	env.CHANNEL_ALERT_ID,
	ChannelType.GuildText
);
export const CHANNEL_LOG = await fetchChannel(
	env.CHANNEL_LOG_ID,
	ChannelType.GuildText
);
export const CHANNEL_MODLOG = await fetchChannel(
	env.CHANNEL_MODLOG_ID,
	ChannelType.GuildAnnouncement
);
export const CHANNEL_INFO = await fetchChannel(
	env.CHANNEL_INFO_ID,
	ChannelType.GuildText
);
export const CHANNEL_MEETUPS = await fetchChannel(
	env.CHANNEL_MEETUPS_ID,
	ChannelType.GuildForum
);
