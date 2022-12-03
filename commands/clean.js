//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('Deletes messages in bulk.')
    .addIntegerOption(option =>
		option.setName('number')
			.setDescription('The number of recent messages to delete in this channel. Maximum of 100.')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
    const number = interaction.options.getInteger('number');

    await interaction.channel.bulkDelete(number)
      .then(messages => interaction.reply(`:broom: Deleted ${messages.size} messages in <#${interaction.channel.id}>.`));
	},
};
