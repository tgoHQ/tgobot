const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ModLog = require("../modules/modlog");
const modlog = require("../modules/modlog");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unmute")
		.setDescription("Unmutes a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to unmute")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the unmute")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const targetUser = member.user;
		const reason = interaction.options.getString("reason");
		const author = interaction.user;

		await member.timeout(null, reason).then(() => {
			const modlog = new ModLog({
				type: "Unmute",
				author,
				reason,
				targetUser,
			});
			modlog.post(interaction);
			interaction.reply(modlog.string);
		});
	},
};
