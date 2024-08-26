import { Command } from "@sapphire/framework";

export class WarpCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("warp")
				.setDescription("Search the TGO Guide for information.")
				.addStringOption((option) =>
					option
						.setName("query")
						.setDescription("Your search query")
						.setRequired(true)
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		await interaction.deferReply();

		interaction.editReply(
			`https://thegreatoutdoors.guide/warp?q=${encodeURIComponent(
				interaction.options.getString("query", true)
			)}`
		);
	}
}
