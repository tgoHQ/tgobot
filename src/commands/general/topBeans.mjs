import { SlashCommandBuilder } from "discord.js";
import callDB from "../../modules/database.mjs";

export default {
	data: new SlashCommandBuilder()
		.setName("topbeans")
		.setDescription("Lists users with the most beans."),
	async execute(interaction) {
		const data = await callDB("/beans?sort=-quantity", "GET");
		interaction.reply(JSON.stringify(data));
	},
};
