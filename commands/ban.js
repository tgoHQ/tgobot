//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits, inlineCode } = require('discord.js');
const modlog = require("../modules/modlog");

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

    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
		const author = interaction.user;

    await interaction.guild.bans.create(targetUser, {reason: reason})
      .then(function() {
				modlog.create({
					type: "Ban",
					author,
					reason,
					targetUser,
					interaction
				}
				.then(string => interaction.reply(string))
			})
	},
};
