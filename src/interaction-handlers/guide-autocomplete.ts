import {
	InteractionHandler,
	InteractionHandlerTypes,
} from "@sapphire/framework";
import type { AutocompleteInteraction } from "discord.js";
import env from "../lib/util/env.js";

export class GuideAutocompleteHandler extends InteractionHandler {
	public constructor(
		ctx: InteractionHandler.LoaderContext,
		options: InteractionHandler.Options
	) {
		super(ctx, {
			...options,
			interactionHandlerType: InteractionHandlerTypes.Autocomplete,
		});
	}

	public override async run(
		interaction: AutocompleteInteraction,
		result: InteractionHandler.ParseResult<this>
	) {
		return interaction.respond(result);
	}

	public override async parse(interaction: AutocompleteInteraction) {
		// Only run this interaction for the guide command
		if (interaction.commandName !== "guide") return this.none();

		// Get the focussed (current) option
		const focusedOption = interaction.options.getFocused(true);

		// Ensure that the option name is one that can be autocompleted, or return none if not.
		switch (focusedOption.name) {
			case "query": {
				const response = await fetch(
					env.GUIDE_SEARCH_URL +
						"?q=" +
						encodeURIComponent(focusedOption.value as string)
				);
				const results = await response.json();

				if (results.length === 0)
					return this.some([
						{
							name: "🏠 The Great Outdoors Guide",
							value: "https://thegreatoutdoors.guide/",
						},
					]);

				// Map the search results to the structure required for Autocomplete
				return this.some(
					results.map((match: any) => ({
						name: `🔗 ${match.meta.title} - ${match.raw_url.substr(
							1,
							match.raw_url.length - 2
						)}`,
						value: match.url,
					}))
				);
			}
			default:
				return this.none();
		}
	}
}
