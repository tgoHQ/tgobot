import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import {
	convertGrade,
	Font,
	French,
	VScale,
	YosemiteDecimal,
} from "@openbeta/sandbag";

const gradeScales = [French, YosemiteDecimal, VScale, Font];

export default {
	data: new SlashCommandBuilder()
		.setName("grades")
		.setDescription("Displays information about a climbing grade.")
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
					{ name: YosemiteDecimal.displayName, value: YosemiteDecimal.name },
					{ name: French.displayName, value: French.name }
				)
		),

	async execute(interaction) {
		const input = interaction.options.getString("grade");

		console.log(interaction.options.getString("scale"));

		const inputGradeScale = gradeScales.find((e) => {
			e.name === interaction.options.getString("scale");
		});

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
