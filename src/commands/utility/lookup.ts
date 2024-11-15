import { Command } from "@sapphire/framework";

import { ApplicationCommandType } from "discord.js";

export class LookupCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) => {
			builder.setName("Look this up").setType(ApplicationCommandType.Message);
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
