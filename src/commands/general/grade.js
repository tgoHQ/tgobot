import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import {
	convertGrade,
	French,
	YosemiteDecimal,
	Ewbank,
	Saxon,
} from "@openbeta/sandbag";

const gradeScales = [French, YosemiteDecimal, Ewbank, Saxon];

export default {
	data: new SlashCommandBuilder()
		.setName("grades")
		.setDescription("Displays information about a climbing grade.")
		.addStringOption((option) =>
			option
				.setName("grade")
				.setDescription("The grade to look up.")
				.setRequired(true)
		),

	async execute(interaction) {
		const input = interaction.options.getString("grade");
		let inputGradeScale;

		for (const gradeScale of gradeScales) {
			if (gradeScale.isType(input)) {
				inputGradeScale = gradeScale;
			}
		}

		if (!inputGradeScale) {
			return interaction.reply(
				"Could not resolve your input to a known climbing grade."
			);
		}

		const embed = new EmbedBuilder()
			.setTitle(`Climbing Grade: ${input}`)
			.setColor("137c5a")
			.addFields(
				{
					name: "Grading Scale",
					value: `${inputGradeScale.displayName}`,
				},
				{ name: "Difficulty", value: inputGradeScale.getGradeBand(input) }
			);

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
	},
};
