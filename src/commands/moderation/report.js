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

				${
					member.user.createdTimestamp < Date.now() - 60 * 24 * 60 * 60 * 1000
						? "<:verified:1165088032857276577>"
						: "<:warn:1049224507598061628>"
				} Account created ${time(
			member.user.createdAt,
			TimestampStyles.RelativeTime
		)}.

				${
					member.joinedTimestamp < Date.now() - 120 * 24 * 60 * 60 * 1000
						? "<:verified:1165088032857276577>"
						: "<:warn:1049224507598061628>"
				} ${
			member.flags.has(1) ? "Re-joined the server" : "Joined the server"
		} ${time(member.joinedAt, TimestampStyles.RelativeTime)}.
				${
					member.flags.has(2)
						? "<:verified:1165088032857276577> Has completed onboarding."
						: "<:warn:1049224507598061628> Has not completed onboarding."
				}
			`);
		interaction.reply({ embeds: [embed] });
	},
};
