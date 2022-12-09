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
    const connected = channel.members.toJSON().length;

    if (connected >= 2) {
      await interaction.reply(`There are ${connected} users connected to ${channel}! <@&1050738822771658827>`);
    }
    else {
      await interaction.reply(`There are ${connected} users connected to ${channel}. There must be at least 2 for a VC ping to be made.`);
    }
	},
};
