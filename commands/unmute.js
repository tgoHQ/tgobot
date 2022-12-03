//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmutes a user.')
    .addUserOption(option =>
			option.setName('user')
				.setDescription('The user to unmute')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for the unmute')
				.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
    const member = interaction.options.getMember('user');
		const user = member.user;
    const reason = interaction.options.getString('reason');

		await member.timeout(null, reason)
			.then(interaction.reply(`:loud_sound: Unmuted <@${user.id}> with reason \`${reason}\`.`));
	},
};
