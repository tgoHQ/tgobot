import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import ModLog from "../../modules/modlog/modlog.js";

export default {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Bans a user.")
		.addUserOption((option) =>
			option.setName("user").setDescription("The user to ban").setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the ban")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		const targetUser = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const author = interaction.user;

		await interaction.guild.bans
			.create(targetUser, { reason: reason })
			.then(() => {
				const modlog = new ModLog({
					type: "Ban",
					author,
					reason,
					targetUser,
				});
				modlog.post(interaction.client);
				interaction.reply(modlog.string);
			});
	},
};
