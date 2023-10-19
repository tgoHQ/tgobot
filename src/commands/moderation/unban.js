import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import ModLog from "../../modules/modlog/modlog.js";

export default {
	data: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unbans a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to unban")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the unban")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		const targetUser = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const author = interaction.user;

		await interaction.guild.bans
			.remove(targetUser, reason) //unban the target user
			.then(() => {
				const modlog = new ModLog({
					type: "Unban",
					author,
					reason,
					targetUser,
				});
				modlog.init(interaction.client);
				interaction.reply(modlog.string);
			});
	},
};
