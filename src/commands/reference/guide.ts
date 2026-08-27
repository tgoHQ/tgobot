import { Command } from "@sapphire/framework";
import { AutocompleteInteraction } from "discord.js";
import { env } from "../../env.js";

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
						.setRequired(true),
				)
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("Ping this user in the bot's response")
						.setRequired(false),
				)
				.addBooleanOption((option) =>
					option
						.setName("hidden")
						.setDescription("Make the bot's response visible only to you")
						.setRequired(false),
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const taggedUser = interaction.options.getUser("user", false);
		interaction.reply({
			content: `${interaction.options.getString("query", true)}\n${
				taggedUser ?? ""
			}`,
			ephemeral: !!interaction.options.getBoolean("hidden", false),
		});
	}

	public override async autocompleteRun(interaction: AutocompleteInteraction) {
		const query = interaction.options.getString("query");
		if (!query) return interaction.respond([]);

		const response = await fetch(
			env.GUIDE_SEARCH_URL + "?q=" + encodeURIComponent(query),
		);
		const results = await response.json();

		// Map the search results to the structure required for Autocomplete
		return interaction.respond(
			results.map((match: any) => ({
				name: `🔗 ${match.meta.title} (${match.raw_url
					.substr(1, match.raw_url.length - 2)
					.replaceAll("/", " > ")})`,
				value: match.url,
			})),
		);
	}
}
