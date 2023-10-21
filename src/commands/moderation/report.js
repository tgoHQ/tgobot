import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	time,
	TimestampStyles,
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

		const embed = new EmbedBuilder().setColor("137c5a").setTitle("User Report")
			.setDescription(`
				**User:** ${member.user}

				**Joined server:** ${time(member.joinedAt, TimestampStyles.RelativeTime)}${
			member.flags.has(1) ? " (Not first join!)" : ""
		}
				**First join:** ${!member.flags.has(1)}
				**Account created:** ${time(
					member.user.createdAt,
					TimestampStyles.RelativeTime
				)}
			`);
		interaction.reply({ embeds: [embed] });
	},
};
