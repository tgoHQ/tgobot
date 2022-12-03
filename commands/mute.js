//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const parse = require('parse-duration');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mutes a user.')
    .addUserOption(option =>
			option.setName('user')
				.setDescription('The user to mute')
				.setRequired(true))
    .addStringOption(option =>
			option.setName('duration')
				.setDescription('Duration of the mute')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for the mute')
				.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
    const member = interaction.options.getMember('user');
		const user = member.user;
		const duration = interaction.options.getString('duration');
		const durationMS = parse(duration);
    const reason = interaction.options.getString('reason');

		await member.timeout(durationMS, reason)
			.then(interaction.reply(`:mute: Muted <@${user.id}> for \`${duration}\` with reason \`${reason}\`.`));
	},
};
