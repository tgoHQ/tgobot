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

		await interaction.reply(
			`${input}: ${inputGradeScale.displayName}, ${inputGradeScale.allowableConversionType}`
		);
	},
};
