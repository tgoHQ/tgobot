import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { GradeScales } from "@openbeta/sandbag";

export default {
	data: new SlashCommandBuilder()
		.setName("grades")
		.setDescription("Displays information about a climbing grade."),

	async execute(interaction) {
		await interaction.reply("yo");
	},
};
