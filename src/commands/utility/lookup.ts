import { Command } from "@sapphire/framework";

import { ApplicationCommandType, ContextMenuCommandType } from "discord.js";

export class LookupCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) => {
			builder
				.setName("Look this up")

				//todo what is this stupid bullshit and why is it necessary all of a sudden?
				.setType(ApplicationCommandType.Message as ContextMenuCommandType);
		});
	}

	public override async contextMenuRun(
		interaction: Command.ContextMenuCommandInteraction
	) {
		if (interaction.isMessageContextMenuCommand()) {
			const message = interaction.targetMessage;

			const responseMessage = await message.reply(
				`https://www.startpage.com/sp/search?query=${encodeURIComponent(
					message.content
				)}`
			);

			await responseMessage.suppressEmbeds(true);

			await interaction.reply({
				content: "Command successful.",
				ephemeral: true,
			});
		}
	}
}
