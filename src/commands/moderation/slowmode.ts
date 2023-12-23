import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import parseDuration from "parse-duration";
import slowmode from "../../modules/moderation/actions/slowmode.js";

export default {
	data: new SlashCommandBuilder()
		.setName("slowmode")
		.setDescription("Sets slowmode on the current channel.")
		.addStringOption((option) =>
			option
				.setName("time")
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
		//use slowmode module for all execution
		interaction.reply(
			await slowmode({
				channel: interaction.channel,
				reason: interaction.options.getString("reason"),
				author: interaction.user,
				interval: parseDuration(interaction.options.getString("time")) / 1000,
			})
		);
	},
};
