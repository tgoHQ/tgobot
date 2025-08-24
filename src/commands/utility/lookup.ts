import { Command } from "@sapphire/framework";

import { ApplicationCommandType, MessageFlags } from "discord.js";

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
		interaction: Command.ContextMenuCommandInteraction,
	) {
		if (interaction.isMessageContextMenuCommand()) {
			const message = interaction.targetMessage;

			const encoded = encodeURIComponent(message.content);
			const google = `https://www.google.com/search?q=${encoded}`;
			const startpage = `https://www.startpage.com/sp/search?query=${encoded}`;
			const duckduckgo = `https://duckduckgo.com/?q=${encoded}`;

			await interaction.reply({
				content: `[Google](${google}) | [Startpage](${startpage}) | [Duckduckgo](${duckduckgo})`,
				flags: MessageFlags.SuppressEmbeds,
			});
		}
	}
}
