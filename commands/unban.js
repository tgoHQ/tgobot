//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits, inlineCode } = require('discord.js');
const modlog = require("../modlog");

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

    const targetUser = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');
		const author = interaction.user;


		//check if the user is actually banned
		interaction.guild.bans.fetch(targetUser)
		.then(console.log)
		.catch(console.log("THIS CODE RUNS WHEN THE USER IS NOT BANNED"));

    await interaction.guild.bans.remove(targetUser, reason).then(function() {

			interaction.reply(`:unlock: Unbanned ${targetUser.toString()} with reason ${inlineCode(reason)}.`);
			modlog.create({
				type: "Unban",
				author,
				reason,
				targetUser,
				interaction,
			});

		});
	},
};
