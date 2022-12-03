//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a user.')
    .addUserOption(option =>
		option.setName('user')
			.setDescription('The user to warn')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the warn')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    interaction.reply(`:warning: Warned <@${user.id}> with reason \`${reason}\`.`);
	},
};
