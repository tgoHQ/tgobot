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
] as GradeScale[];

// todo why is this not picking up the types from the library?
// todo also why does the library not export an array of all the scales?
export type GradeScale = {
	name: string;
	displayName: string;
	grades: string[];
	getGradeBand: (grade: string) => string;
	getScore: (grade: string) => number[];
	getGrade: (score: number[]) => string;
};
