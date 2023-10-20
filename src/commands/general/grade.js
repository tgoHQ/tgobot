import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { French, YosemiteDecimal } from "@openbeta/sandbag";

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

		const gradeScales = [French, YosemiteDecimal];

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

		let conversions = inputGradeScale.allowableConversionType[0];
		console.log(conversions);

		const embed = new EmbedBuilder()
			.setTitle(`Climbing Grade: ${input}`)
			.setColor("137c5a")
			.addFields(
				{
					name: "Grading Scale",
					value: `${inputGradeScale.displayName}`,
				},
				{ name: "Difficulty", value: inputGradeScale.getGradeBand(input) },
				{
					name: "Conversions",
					value: inputGradeScale.allowableConversionType[0],
				}
			);

		await interaction.reply({ embeds: [embed] });
	},
};
