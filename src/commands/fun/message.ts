import { Command } from "@sapphire/framework";
import { sleep } from "@sapphire/utilities";

import { PermissionFlagsBits } from "discord.js";

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
				.addStringOption((option) =>
					option
						.setName("content")
						.setDescription("The message to be sent.")
						.setRequired(true),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		await interaction.deferReply({
			ephemeral: true,
		});

		if (!interaction.channel?.isSendable()) {
			return interaction.editReply({
				content: "Cannot send message.",
			});
		}

		const content = interaction.options.getString("content", true);

		//simulate typing
		await interaction.channel.sendTyping();
		await sleep(3000);

		const message = await interaction.channel.send(content);

		return await interaction.editReply({ content: message.url });
	}
}
