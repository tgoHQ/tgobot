//jshint esversion:8
const { SlashCommandBuilder } = require('discord.js');
const storage = require('../modules/storage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setpacklist')
		.setDescription('.')
    .addStringOption(option =>
  		option.setName('packlist')
  			.setDescription('data to save')
  			.setRequired(true)
    ),
	async execute(interaction) {

    const packlist = interaction.options.getString('packlist');
		const author = interaction.user;

    storage.write("packlist", author.id, packlist);
    interaction.reply(storage.read("packlist", "a"));

	},
};
