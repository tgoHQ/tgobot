import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

import parseDuration from "parse-duration";
import timeout from "../../modules/moderation/actions/timeout.js";

export default {
	data: new SlashCommandBuilder()
		.setName("timeout")
		.setDescription("Timeouts a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to timeout")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("duration")
				.setDescription("Duration of the timeout")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the timeout")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

	async execute(interaction) {
		const durationRaw = interaction.options.getString("duration");
		const duration = parseDuration(durationRaw);

		interaction.reply(
			await timeout({
				user: interaction.options.getUser("user"),
				reason: interaction.options.getString("reason"),
				author: interaction.user,
				duration,
			})
		);
	},
};
