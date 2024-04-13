import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChannelType,
} from "discord.js";
import parseDuration from "parse-duration";
import slowmode from "../../../actions/tools/slowmode.js";
import { SlashCommand } from "../index.js";
import getDuration from "../../../lib/util/getDuration.js";

export default {
	data: new SlashCommandBuilder()
		.setName("slowmode")
		.setDescription("Sets slowmode on a channel.")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Channel to set slowmode on")
				.setRequired(true)
				.addChannelTypes(
					ChannelType.GuildText,
					ChannelType.GuildAnnouncement,
					ChannelType.GuildStageVoice,
					ChannelType.AnnouncementThread,
					ChannelType.PublicThread,
					ChannelType.GuildVoice
				)
		)
		.addStringOption((option) =>
			option
				.setName("interval")
				.setDescription(
					"Slowmode interval. Accepts units and abbreviations. Set to 0 to disable slowmode."
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the slowmode")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		const intervalRaw = interaction.options.getString("interval", true);
		const interval = parseDuration(intervalRaw) ?? getDuration.hours(1); //default 1 hour if input cannot be parsed

		//use slowmode module for all execution
		interaction.reply(
			await slowmode({
				targetChannel: interaction.options.getChannel("channel", true, [
					ChannelType.GuildText,
					ChannelType.GuildAnnouncement,
					ChannelType.GuildStageVoice,
					ChannelType.AnnouncementThread,
					ChannelType.PublicThread,
					ChannelType.GuildVoice,
				]),
				reason: interaction.options.getString("reason", true),
				author: interaction.user,
				interval,
			})
		);
	},
} satisfies SlashCommand;
