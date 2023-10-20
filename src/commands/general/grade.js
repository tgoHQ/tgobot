import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { GradeScales, YosemiteDecimal } from "@openbeta/sandbag";

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

		console.log(YosemiteDecimal.isType(input));

		await interaction.reply(input);
	},
};
