import { ChannelType, EmbedBuilder } from "discord.js";
import client from "../client.js";
import env from "../env.js";

export default async function postModLogChannel(embed: EmbedBuilder) {
	const channel = client.channels.cache.get(env.CHANNEL_MODLOG_ID);

	if (channel?.type !== ChannelType.GuildAnnouncement)
		throw new Error("modlog channel not found");

	return channel.send({ embeds: [embed] });
}
//todo this whole file
