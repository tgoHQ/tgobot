import { Command } from "@sapphire/framework";
import env from "../../lib/util/env.js";

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
						.setRequired(true)
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		await interaction.deferReply();
		const query = interaction.options.getString("query", true);
		const url = env.GUIDE_SEARCH_URL + "?q=" + encodeURIComponent(query);

		const results = await (await fetch(url)).json();

		if (results.length === 0) {
			interaction.editReply("No results found");
		} else {
			interaction.editReply(results[0].url);
		}
	}
}
