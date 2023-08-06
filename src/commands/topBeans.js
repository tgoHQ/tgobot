const { SlashCommandBuilder } = require("discord.js");
const callDB = require("../modules/database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("topbeans")
		.setDescription("Lists users with the most beans."),
	async execute(interaction) {
		const data = await callDB("/beans?sort=-quantity", "GET");
		interaction.reply(JSON.stringify(data));
	},
};
