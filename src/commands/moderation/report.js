import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("report")
		.setDescription("Displays moderation info about a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to inspect")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const targetUser = member.user;

		const embed = new EmbedBuilder()
			.setColor("137c5a")
			.setTitle("User Report")
			.addFields({ name: "Tag", value: member.user.toString() });

		interaction.reply({ embeds: [embed] });
	},
};
