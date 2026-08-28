import { Command } from "@sapphire/framework";

import { PermissionFlagsBits, ChannelType } from "discord.js";
import parseDuration from "parse-duration";
import { slowmode } from "#lib/moderation/actions/tools/slowmode";
import { getDuration } from "#util/getDuration";

export class SlowmodeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("slowmode")
				.setDescription("Sets slowmode on a channel.")
				.addStringOption((option) =>
					option
						.setName("interval")
						.setDescription(
							"Slowmode interval. Accepts units and abbreviations. Set to 0 to disable slowmode.",
						)
						.setRequired(true),
				)
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("Channel to set slowmode on")
						.addChannelTypes(
							ChannelType.GuildText,
							ChannelType.GuildAnnouncement,
							ChannelType.GuildStageVoice,
							ChannelType.AnnouncementThread,
							ChannelType.PublicThread,
							ChannelType.GuildVoice,
						),
				)
				.addStringOption((option) =>
					option.setName("reason").setDescription("Reason for the slowmode"),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const intervalRaw = interaction.options.getString("interval", true);
		const interval = parseDuration(intervalRaw) ?? getDuration.hours(1); //default 1 hour if input cannot be parsed
		const channelOption = interaction.options.getChannel("channel", false, [
			ChannelType.GuildText,
			ChannelType.GuildAnnouncement,
			ChannelType.GuildStageVoice,
			ChannelType.AnnouncementThread,
			ChannelType.PublicThread,
			ChannelType.GuildVoice,
		]);

		if (!interaction.channel || interaction.channel.isDMBased()) return;

		const targetChannel = channelOption ?? interaction.channel;

		//use slowmode module for all execution
		interaction.reply(
			await slowmode({
				targetChannel,
				reason: interaction.options.getString("reason") ?? undefined,
				author: interaction.user,
				interval,
			}),
		);
	}
}
