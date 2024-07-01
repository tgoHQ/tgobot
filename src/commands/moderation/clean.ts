import { Command } from "@sapphire/framework";

import { PermissionFlagsBits, ChannelType } from "discord.js";
import bulkDelete from "../../lib/moderation/actions/tools/bulkDelete.js";

export class CleanCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("clean")
				.setDescription("Delete messages in bulk")
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
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		interaction.reply(
			await bulkDelete({
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
				number: interaction.options.getInteger("number", true),
			})
		);
	}
}
