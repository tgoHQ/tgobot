import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("untimeout")
		.setDescription("Untimeouts a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to untimeout")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the untimeout")
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
				type: "Untimeout",
				author,
				reason,
				targetUser,
			});
			modlog.init(interaction.client);
			interaction.reply(modlog.string);
		});
	},
};
