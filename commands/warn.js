const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warns a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to warn")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the warn")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		const targetUser = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const author = interaction.user;

		const modLog = new ModLog(
			{
				type: "Warn",
				author,
				reason,
				targetUser,
			},
			interaction.client
		);
		await modLog.post(interaction.client).then(function () {
			interaction.reply(modLog.string);
		});
	},
};
