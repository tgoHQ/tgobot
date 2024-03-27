import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import parseDuration from "parse-duration";
import slowmode from "../../lib/moderation/tools/slowmode.js";

export default {
	data: new SlashCommandBuilder()
		.setName("slowmode")
		.setDescription("Sets slowmode on the current channel.")
		.addStringOption((option) =>
			option
				.setName("interval")
				.setDescription(
					"Slowmode interval. Accepts units and abbreviations. Set to 0 to disable slowmode."
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the slowmode")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		const intervalRaw = interaction.options.getString("interval");
		const interval = parseDuration(intervalRaw) ?? 60 * 60 * 1000; //default 1 hour if input cannot be parsed

		//use slowmode module for all execution
		interaction.reply(
			await slowmode({
				channel: interaction.channel,
				reason: interaction.options.getString("reason"),
				author: interaction.user,
				interval,
			})
		);
	},
};
