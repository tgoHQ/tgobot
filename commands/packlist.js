//jshint esversion:8
const { SlashCommandBuilder } = require('discord.js');
const storage = require('../modules/storage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('packlist')
		.setDescription('.'),
	async execute(interaction) {



	},
};
