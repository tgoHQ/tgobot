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

		const embed = new EmbedBuilder().setColor("137c5a").setTitle("User Report")
			.setDescription(`
				**User:** ${member.user}
				**Account created:** ${time(
					member.user.createdAt,
					TimestampStyles.RelativeTime
				)}

				**Joined server** ${time(member.joinedAt, TimestampStyles.RelativeTime)}${
			member.flags.has(1)
				? " <:warn:1049224507598061628> Not first join!"
				: "(first join ever)"
		}
				${
					member.flags.has(2)
						? "User has completed onboarding."
						: "User has not completed onboarding."
				}
			`);
		interaction.reply({ embeds: [embed] });
	},
};
