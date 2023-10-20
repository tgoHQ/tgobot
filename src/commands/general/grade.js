import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { French, GradeScales, YosemiteDecimal } from "@openbeta/sandbag";

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

		const gradeScales = [
			{
				lib: YosemiteDecimal,
				name: GradeScales.YDS,
			},
		];

		for (const gradeScale of gradeScales) {
			if (gradeScale.lib.isType(input)) inputGradeScale = gradeScale.name;
		}

		await interaction.reply(`${input}: ${inputGradeScale}`);
	},
};
