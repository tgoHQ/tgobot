import {
	InteractionHandler,
	InteractionHandlerTypes,
} from "@sapphire/framework";
import type { AutocompleteInteraction } from "discord.js";

export class ClimbingGradeAutoComplete extends InteractionHandler {
	public constructor(
		ctx: InteractionHandler.LoaderContext,
		options: InteractionHandler.Options,
	) {
		super(ctx, {
			...options,
			interactionHandlerType: InteractionHandlerTypes.Autocomplete,
		});
	}

	public override async run(
		interaction: AutocompleteInteraction,
		result: InteractionHandler.ParseResult<this>,
	) {
		return interaction.respond(result);
	}

	public override async parse(interaction: AutocompleteInteraction) {
		// Only run this interaction for the guide command
		if (interaction.commandName !== "rockgrade") return this.none();

		const scaleName = interaction.options.getString("scale");

		// if no scale is selected yet, return a default message
		if (!scaleName) {
			return this.none();
		}

		//get the scale
		const gradeScale = gradeScales.find((e) => {
			return e.name === scaleName;
		});
		if (!gradeScale) return this.none();

		const options = gradeScale.grades.map((grade) => {
			return {
				name: `${grade}`,
				value: `${gradeScale.name}@${grade}`,
			};
		});

		const filtered = options.filter((grade) => {
			return grade.name
				.toUpperCase()
				.includes(interaction.options.getString("grade", true).toUpperCase());
		});

		const limited = filtered.slice(0, 24);

		return this.some(limited);
	}
}

import {
	YosemiteDecimal,
	UIAA,
	French,
	Ewbank,
	Saxon,
	Norwegian,
	BrazilianCrux,
	Font,
	VScale,
	AI,
	WI,
	Aid,
} from "@openbeta/sandbag";

export const gradeScales = [
	YosemiteDecimal,
	UIAA,
	French,
	Ewbank,
	Saxon,
	Norwegian,
	BrazilianCrux,
	Font,
	VScale,
	AI,
	WI,
	Aid,
];

// todo sandbag doesn't export an array of all the scales, nor its GradeScale
// interface from the package root, so derive it from the array above.
export type GradeScale = (typeof gradeScales)[number];
