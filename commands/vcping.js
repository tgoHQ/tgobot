//jshint esversion:8
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vcping')
		.setDescription('Notifies people that a vc is happening.')
    .addChannelOption(option =>
    option.setName('channel')
			.setDescription('Channel where the VC is happening.')
			.setRequired(true)),
	async execute(interaction) {
    const channel = interaction.options.getChannel('channel');

    if (true) {
      await interaction.reply(channel.members.length);
    }
    else {
      await interaction.reply("There aren't enough people connected to run the command!");
    }
	},
};
