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
		const gradeSet = gradeSets.find((e) => {
			return e.scale.name === scaleName;
		});
		if (!gradeSet) return this.none();

		const options = gradeSet.grades.map((grade) => {
			return {
				name: `${grade}`,
				value: `${gradeSet.scale.name}@${grade}`,
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
	freeClimbing,
	YosemiteDecimal,
	UIAA,
	French,
	Ewbank,
	Saxon,
	Norwegian,
	BrazilianCrux,
} from "@openbeta/sandbag";

const ydsGrades = freeClimbing.clean.yds;
const uiaaGrades = freeClimbing.clean.UIAA;
const frenchGrades = freeClimbing.clean.French;
const ewbankGrades = freeClimbing.clean.Ewbank;
const saxonGrades = freeClimbing.clean.Saxon;
const norwegianGrades = freeClimbing.clean.Norwegian;
const brazilianGrades = freeClimbing.clean.BrazilianCrux;

export const gradeSets = [
	{ scale: YosemiteDecimal, grades: ydsGrades },
	{ scale: UIAA, grades: uiaaGrades },
	{ scale: French, grades: frenchGrades },
	{ scale: Ewbank, grades: ewbankGrades },
	{ scale: Saxon, grades: saxonGrades },
	{ scale: Norwegian, grades: norwegianGrades },
	{ scale: BrazilianCrux, grades: brazilianGrades ?? [] },
];
