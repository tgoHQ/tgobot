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

		const embed = new EmbedBuilder()
			.setColor("137c5a")
			.setTitle("User Report")
			.setThumbnail(member.user.displayAvatarURL()).setDescription(`
				${member.user}

				Account created ${time(member.user.createdAt, TimestampStyles.RelativeTime)}

				${
					member.flags.has(1)
						? "Re-joined the server"
						: "Joined for the first time"
				} ${time(member.joinedAt, TimestampStyles.RelativeTime)}
				${
					member.flags.has(2)
						? "User has completed onboarding."
						: "<:warn:1049224507598061628> User has not completed onboarding."
				}
			`);
		interaction.reply({ embeds: [embed] });
	},
};
