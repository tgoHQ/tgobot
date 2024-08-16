import env from "../util/env.js";
import { container } from "@sapphire/framework";
import { Channel, ChannelType, Role } from "discord.js";

export const GUILD = async () =>
	await container.client.guilds.fetch(env.GUILD_ID);

// ROLES //
async function fetchRole(id: string) {
	const role = (await GUILD()).roles.fetch(id);
	if (role === null) {
		throw new Error("Role not found");
	}
	return role as Promise<Role>;
}
export const ROLE_BOT = async () => await fetchRole(env.ROLE_BOT_ID);
export const ROLE_VCPING = async () => await fetchRole(env.ROLE_VCPING_ID);
export const ROLE_INTRODUCED = async () =>
	await fetchRole(env.ROLE_INTRODUCED_ID);

// CHANNELS //
async function fetchChannel<T extends ChannelType>(
	id: string,
	type: T
): Promise<Channel & { type: T }> {
	const channel = await container.client.channels.fetch(id);
	if (!channel) throw new Error(`Channel ${id} not found`);
	if (channel.type !== type)
		throw new Error(`Channel ${id} is not of type ${type}`);
	return channel as Channel & { type: T };
}

export const CHANNEL_INTRODUCTIONS = async () =>
	await fetchChannel<ChannelType.GuildText>(
		env.CHANNEL_INTRODUCTIONS_ID,
		ChannelType.GuildText
	);
export const CHANNEL_ALERT = async () =>
	await fetchChannel(env.CHANNEL_ALERT_ID, ChannelType.GuildText);
export const CHANNEL_LOG = async () =>
	await fetchChannel(env.CHANNEL_LOG_ID, ChannelType.GuildText);
export const CHANNEL_MODLOG = async () =>
	await fetchChannel(env.CHANNEL_MODLOG_ID, ChannelType.GuildAnnouncement);
export const CHANNEL_INFO = async () =>
	await fetchChannel(env.CHANNEL_INFO_ID, ChannelType.GuildText);
export const CHANNEL_MEETUPS = async () =>
	await fetchChannel(env.CHANNEL_MEETUPS_ID, ChannelType.GuildForum);
export const CHANNEL_PHOTOS = async () =>
	await fetchChannel(env.CHANNEL_PHOTOS_ID, ChannelType.GuildForum);
export const CHANNEL_NATURE = async () =>
	await fetchChannel(env.CHANNEL_NATURE_ID, ChannelType.GuildText);
export const CHANNEL_TRIP_REPORTS = async () =>
	await fetchChannel(env.CHANNEL_TRIP_REPORTS_ID, ChannelType.GuildForum);
export const CHANNEL_TOWN_HALL = async () =>
	await fetchChannel(env.CHANNEL_TOWN_HALL_ID, ChannelType.GuildAnnouncement);

export const CHANNEL_CAMPING = async () =>
	await fetchChannel(env.CHANNEL_CAMPING_ID, ChannelType.GuildText);
export const CHANNEL_HIKING = async () =>
	await fetchChannel(env.CHANNEL_HIKING_ID, ChannelType.GuildText);
export const CHANNEL_ON_THE_WATER = async () =>
	await fetchChannel(env.CHANNEL_ON_THE_WATER_ID, ChannelType.GuildText);
export const CHANNEL_WINTER_SPORTS = async () =>
	await fetchChannel(env.CHANNEL_WINTER_SPORTS_ID, ChannelType.GuildText);
export const CHANNEL_CLIMBING = async () =>
	await fetchChannel(env.CHANNEL_CLIMBING_ID, ChannelType.GuildText);
export const CHANNEL_BIKING = async () =>
	await fetchChannel(env.CHANNEL_BIKING_ID, ChannelType.GuildText);
export const CHANNEL_ALPINE = async () =>
	await fetchChannel(env.CHANNEL_ALPINE_ID, ChannelType.GuildText);
// const tag = CHANNEL_PHOTOS.availableTags.find(
// 	(tag) => tag.id === env.TAG_PHOTO_OF_THE_WEEK_ID
// );
// if (!tag) throw new Error("Photo of the week tag not found");
// export const TAG_PHOTO_OF_THE_WEEK = tag.id;

//todo attach this to container for clean import
//make it an object instead of individual exports/imports
