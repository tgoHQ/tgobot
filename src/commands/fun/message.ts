import { Command } from "@sapphire/framework";

import { PermissionFlagsBits, ChannelType } from "discord.js";

export class MessageCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("message")
				.setDescription("Sends a message as the bot.")
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("Channel to send the message in.")
						.setRequired(true)
						.addChannelTypes(
							ChannelType.GuildAnnouncement,
							ChannelType.GuildText
						)
				)
				.addStringOption((option) =>
					option
						.setName("value")
						.setDescription("The message to be sent.")
						.setRequired(true)
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		const channel = interaction.options.getChannel("channel", true, [
			ChannelType.GuildAnnouncement,
			ChannelType.GuildText,
		]);

		const value = interaction.options.getString("value");
		if (!value) return;

		await channel.send(value).then((message) => {
			interaction.reply({ content: message.url, ephemeral: true });
		});
	}
}
