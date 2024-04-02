import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChannelType,
} from "discord.js";
import bulkDelete from "../../lib/moderation/tools/bulkDelete.js";
import { SlashCommand } from "../index.js";

export default {
	data: new SlashCommandBuilder()
		.setName("clean")
		.setDescription("Deletes messages in bulk")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Channel to clean")
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
		.addIntegerOption((option) =>
			option
				.setName("number")
				.setDescription(
					"The number of recent messages to delete in the channel. Maximum of 100."
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the clean")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		interaction.reply(
			await bulkDelete({
				channel: interaction.options.getChannel("channel", true, [
					ChannelType.GuildText,
					ChannelType.GuildAnnouncement,
					ChannelType.GuildStageVoice,
					ChannelType.AnnouncementThread,
					ChannelType.PublicThread,
					ChannelType.GuildVoice,
				]),
				reason: interaction.options.getString("reason", true),
				author: interaction.user,
				number: interaction.options.getInteger("number", true),
			})
		);
	},
} satisfies SlashCommand;
