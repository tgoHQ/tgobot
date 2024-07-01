import { Command } from "@sapphire/framework";

import { EmbedBuilder } from "discord.js";
import {
	convertGrade,
	Ewbank,
	Font,
	French,
	Saxon,
	VScale,
	YosemiteDecimal,
	WI,
	AI,
	Aid,
} from "@openbeta/sandbag";
const gradeScales = [
	French,
	YosemiteDecimal,
	VScale,
	Font,
	Ewbank,
	Saxon,
	WI,
	AI,
	Aid,
];

export class GradesCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("grades")
				.setDescription(
					"Displays info about a climbing grade and converts it to other scales."
				)
				.addStringOption((option) =>
					option
						.setName("grade")
						.setDescription("The grade to look up.")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("scale")
						.setDescription("The scale this grade is on")
						.setRequired(true)
						.addChoices(
							{
								name: YosemiteDecimal.displayName,
								value: YosemiteDecimal.name,
							},
							{ name: French.displayName, value: French.name },
							{ name: Font.displayName, value: Font.name },
							{ name: VScale.displayName, value: VScale.name },
							{ name: Ewbank.displayName, value: Ewbank.name },
							{ name: WI.displayName, value: WI.name },
							{ name: AI.displayName, value: AI.name },
							{ name: Aid.displayName, value: Aid.name },
							{ name: Saxon.displayName, value: Saxon.name }
						)
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		const input = interaction.options.getString("grade", true);

		//find grade scale from input
		const inputGradeScale = gradeScales.find((e) => {
			return e.name === interaction.options.getString("scale");
		});

		if (!inputGradeScale) throw ""; //todo

		//if the grade does not match the selected scale, reject
		if (!inputGradeScale.isType(input)) {
			await interaction.reply(
				"Your input does not match a valid/known climbing grade."
			);
			return;
		}

		const embed = new EmbedBuilder()
			.setTitle(`${inputGradeScale.displayName}: ${input}`)
			.setColor("#137c5a")
			.addFields({
				name: "Difficulty",
				value: inputGradeScale.getGradeBand(input),
			});

		//for each scale we can convert to, convert it and add a field to the embed
		for (const convertTypeName of inputGradeScale.allowableConversionType) {
			const convertType = gradeScales.find((e) => {
				return e.name === convertTypeName;
			});

			if (convertType) {
				embed.addFields({
					name: `${convertType.displayName} Conversion`,
					value: convertGrade(input, inputGradeScale.name, convertType.name),
				});
			}
		}

		await interaction.reply({ embeds: [embed] });
	}
}
