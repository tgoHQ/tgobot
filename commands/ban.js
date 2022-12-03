//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user.')
    .addUserOption(option =>
		option.setName('user')
			.setDescription('The user to ban')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the ban')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    await interaction.guild.bans.create(user, {reason: reason})
      .then(interaction.reply(`:hammer: Banned <@${user.id}> with reason \`${reason}\`.`));
	},
};
