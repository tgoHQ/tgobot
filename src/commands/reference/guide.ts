import { Command } from "@sapphire/framework";

export class GuideCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("guide")
				.setDescription("Find an article from the guide.")
				.addStringOption((option) =>
					option
						.setName("query")
						.setDescription("Your search query")
						.setAutocomplete(true)
						.setRequired(true)
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		interaction.reply(interaction.options.getString("query", true));
	}
}
