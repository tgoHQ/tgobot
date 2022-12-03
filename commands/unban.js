//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user.')
    .addUserOption(option =>
		option.setName('user')
			.setDescription('The user to unban')
			.setRequired(true))
		.addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the unban')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
    const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');

    await interaction.guild.bans.remove(user, reason)
			.then(interaction.reply(`:unlock: Unbanned <@${user.id}> with reason \`${reason}\`.`));
	},
};
