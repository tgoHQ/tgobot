//jshint esversion:8
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vcping')
		.setDescription('Notifies people that a vc is happening.'),
	async execute(interaction) {

		await interaction.reply("success");
	},
};
