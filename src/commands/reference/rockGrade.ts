import { Command } from "@sapphire/framework";

import {
	MessageFlags,
	ContainerBuilder,
	TextDisplayBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} from "discord.js";
import { colors } from "../../util/colors.js";

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

// todo sandbag doesn't export an array of all the scales - make a PR to fix this
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

//todo sandbag doesn't export the GradeScale type - make a PR to fix this
type GradeScale = (typeof gradeScales)[number];

export class GradesCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("rockgrade")
				.setDescription(
					"Displays info about a climbing grade and converts it to other scales.",
				)
				.addStringOption((option) =>
					option
						.setName("scale")
						.setDescription("The scale of the grade you're looking up")
						.setRequired(true)
						.addChoices(
							gradeScales.map((scale) => {
								return {
									name: scale.displayName,
									value: scale.name,
								};
							}),
						),
				)
				.addStringOption((option) =>
					option
						.setName("grade")
						.setDescription("The grade to look up")
						.setAutocomplete(true)
						.setRequired(true),
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const input = interaction.options.getString("grade", true);
		const [scaleName, grade] = input.split("@");

		if (!scaleName || !grade) return;

		//find grade scale from input
		const scale = gradeScales.find((scale) => {
			return scale.name === scaleName;
		});

		if (!scale) return;

		const conversions = getAllConversionsForGrade(grade, scale);
		const conversionsFormatted = conversions
			.map((e) => `\`${e.grade}\` | ${e.scale.displayName}`)
			.join("\n\n");

		const container = new ContainerBuilder()
			.setAccentColor(colors.staffGreen.decimal)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					`# \`${grade}\` | ${scale.displayName}`,
				),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					`**Difficulty:** ${scale.getGradeBand(grade)}`,
				),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					conversionsFormatted.length > 0
						? conversionsFormatted
						: "No conversions available.",
				),
			);

		//for each scale we can convert to, convert it and add a field to the embed

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [container],
		});
	}

	public override autocompleteRun(
		interaction: Command.AutocompleteInteraction,
	) {
		const scaleName = interaction.options.getString("scale");
		const gradeQuery = interaction.options.getString("grade") ?? "";

		// if no scale is selected yet, return no items
		if (!scaleName) {
			return interaction.respond([]);
		}

		//get the scale
		const gradeScale = gradeScales.find((e) => {
			return e.name === scaleName;
		});
		if (!gradeScale) return interaction.respond([]);

		const filteredGrades = gradeScale.grades.filter((grade) => {
			return grade.toUpperCase().includes(gradeQuery.toUpperCase());
		});

		const options = filteredGrades.map((grade) => {
			return {
				name: `${grade}`,
				value: `${gradeScale.name}@${grade}`,
			};
		});

		//the max number of options to return is 25
		const result = options.slice(0, 24);

		return interaction.respond(result);
	}
}

function getAllConversionsForGrade(grade: string, originalScale: GradeScale) {
	const difficultyScore = originalScale.getScore(grade);

	return gradeScales.flatMap((convertScale) => {
		//do not "convert" it to the scale it already is
		if (convertScale.name === originalScale.name) return [];

		//find the grade for this difficulty score within this scale
		return {
			scale: convertScale,
			grade: convertScale.getGrade(difficultyScore),
		};
	});
}
