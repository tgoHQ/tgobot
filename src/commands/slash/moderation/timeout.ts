import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

import parseDuration from "parse-duration";
import timeout from "../../../actions/users/timeout.js";
import { SlashCommand } from "../index.js";
import getDuration from "../../../lib/util/getDuration.js";

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
				.setDescription(
					"Duration of the timeout. Accepts units and abbreviations."
				)
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
		//todo if user is not a member of the server

		const durationRaw = interaction.options.getString("duration", true);
		const duration = parseDuration(durationRaw) ?? getDuration.hours(1); //default 1 hour if input cannot be parsed

		interaction.reply(
			await timeout({
				user: interaction.options.getUser("user", true),
				reason: interaction.options.getString("reason", true),
				author: interaction.user,
				duration: duration,
			})
		);
	},
} satisfies SlashCommand;
