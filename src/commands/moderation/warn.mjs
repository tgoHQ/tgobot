import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import ModLog from "../../modules/modlog.mjs";

export default {
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

		const modLog = new ModLog({
			type: "Warn",
			author,
			reason,
			targetUser,
		});
		modLog.post(interaction.client);
		interaction.reply(modLog.string);
	},
};
